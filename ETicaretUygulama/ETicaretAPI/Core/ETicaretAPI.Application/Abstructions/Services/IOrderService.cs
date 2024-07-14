using ETicaretAPI.Application.DTOs.Order;

namespace ETicaretAPI.Application.Abstructions.Services
{
    public interface IOrderService
    {
        Task CreateOrderAsync(CreateOrder createOrder);

        Task<ListOrder> GetAllOrdersAsync(int page,int size);

        Task<SingleOrder> GetOrderByIdAsync(string id);

        Task<(bool,CompletedOrderDTO)> CompletedOrderAsync(string id);
    }
}
