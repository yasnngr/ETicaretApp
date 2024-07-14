﻿using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.DTOs.Order;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Persistence.Services
{
    public class OrderService : IOrderService
    {
        readonly IOrderWriteRepository _orderWriteRepository;
        readonly IOrderReadRepository _orderReadRepository;
        readonly ICompletedOrderWriteRepository _completedOrderWriteRepository;
        readonly ICompletedOrderReadRepository _completedOrderReadRepository;

        public OrderService(IOrderWriteRepository orderWriteRepository, IOrderReadRepository orderReadRepository, ICompletedOrderWriteRepository completedOrderWriteRepository, ICompletedOrderReadRepository completedOrderReadRepository)
        {
            _orderWriteRepository = orderWriteRepository;
            _orderReadRepository = orderReadRepository;
            _completedOrderWriteRepository = completedOrderWriteRepository;
            _completedOrderReadRepository = completedOrderReadRepository;
        }



        public async Task CreateOrderAsync(CreateOrder createOrder)
        {
            var orderCode = (new Random().NextDouble() * 10000).ToString();
            orderCode = orderCode.Substring(orderCode.IndexOf(",") + 1,orderCode.Length - orderCode.IndexOf(",") - 1);

            await _orderWriteRepository.AddAsync(new()
            {
                Address = createOrder.Address,
                Id = Guid.Parse(createOrder.BasketId),
                Description = createOrder.Description,
                OrderCode = orderCode
            });
            await _orderWriteRepository.SaveAsync();
        }

        public async Task<ListOrder> GetAllOrdersAsync(int page, int size)
        {
            var query = _orderReadRepository.Table.Include(o => o.Basket)
                  .ThenInclude(b => b.User)
                  .Include(o => o.Basket)
                      .ThenInclude(b => b.BasketItems)
                      .ThenInclude(bi => bi.Product);
            
            var data = query.Skip(page * size).Take(size);

            var compData = from order in data
                           join completedOrder in _completedOrderReadRepository.Table
                           on order.Id equals completedOrder.OrderId into co
                           from _co in co.DefaultIfEmpty()
                           select new
                           {
                               Id = order.Id,
                               CreatedDate = order.CreatedDate,
                               OrderCode = order.OrderCode,
                               Basket = order.Basket,
                               Completed = _co != null ? true : false
                           };

            return new()
            {
                TotalOrderCount = await query.CountAsync(),
                Orders = await compData.Select(o => new
                {
                    Id = o.Id,
                    CreatedDate = o.CreatedDate,
                    OrderCode = o.OrderCode,
                    TotalPrice = o.Basket.BasketItems.Sum(bi => bi.Product.Price * bi.Quantity),
                    UserName = o.Basket.User.UserName,
                    o.Completed
                }).ToListAsync()
             };
        }

        public async Task<SingleOrder> GetOrderByIdAsync(string id)
        {
            var data = _orderReadRepository.Table
                .Include(o => o.Basket)
                    .ThenInclude(b => b.BasketItems)
                        .ThenInclude(bi => bi.Product);


                 var compData = await (from order in data
                                join completedOrder in _completedOrderReadRepository.Table
                                on order.Id equals completedOrder.OrderId into co
                                from _co in co.DefaultIfEmpty()
                                select new
                                {
                                    Id = order.Id,
                                    CreatedDate = order.CreatedDate,
                                    OrderCode = order.OrderCode,
                                    Basket = order.Basket,
                                    Address = order.Address,
                                    Description = order.Description,
                                    Completed = _co != null ? true : false

                                }).FirstOrDefaultAsync(o => o.Id == Guid.Parse(id));

            return new()
            {
                Id = compData.Id.ToString(),
                BasketItems = compData.Basket.BasketItems.Select(bi => new
                {
                    bi.Product.Name,
                    bi.Product.Price,
                    bi.Quantity
                }),
                Address = compData.Address,
                CreatedDate = compData.CreatedDate,
                Description = compData.Description,
                OrderCode = compData.OrderCode,
                Completed=compData.Completed
            };
        }

        public async Task<(bool,CompletedOrderDTO)> CompletedOrderAsync(string id)
        {
            Order? order = await _orderReadRepository.Table
                .Include(o=>o.Basket)
                .ThenInclude(b=>b.User)
                .FirstOrDefaultAsync(o=>o.Id==Guid.Parse(id));
            if (order != null)
            {
                await _completedOrderWriteRepository.AddAsync(new() { OrderId = Guid.Parse(id) });
                return (await _completedOrderWriteRepository.SaveAsync() > 0, new()
                {
                    OrderCode = order.OrderCode,
                    OrderDate = order.CreatedDate,
                    UserSurname = order.Basket.User.NameSurname,
                    EMail = order.Basket.User.Email
                });
            }
            return (false,null);
        }
    }
}
