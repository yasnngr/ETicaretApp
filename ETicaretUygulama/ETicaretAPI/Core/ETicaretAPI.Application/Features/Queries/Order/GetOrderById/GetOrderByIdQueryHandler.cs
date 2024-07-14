﻿using ETicaretAPI.Application.Abstructions.Services;
using MediatR;

namespace ETicaretAPI.Application.Features.Queries.Order.GetOrderById
{
    public class GetOrderByIdQueryHandler : IRequestHandler<GetOrderByIdQueryRequest, GetOrderByIdQueryResponse>
    {
        readonly IOrderService _orderService;

        public GetOrderByIdQueryHandler(IOrderService orderService)
        {
            _orderService = orderService;
        }

        public async Task<GetOrderByIdQueryResponse> Handle(GetOrderByIdQueryRequest request, CancellationToken cancellationToken)
        {
            var data = await _orderService.GetOrderByIdAsync(request.Id);

            return new()
            {
               Id = data.Id,
               OrderCode = data.OrderCode,
               BasketItems = data.BasketItems,
               Description = data.Description,
               Address = data.Address,
               CreatedDate = data.CreatedDate,
               Completed = data.Completed,
            };
        }
    }
}