using ETicaretAPI.Application.Abstructions.Hubs;
using ETicaretAPI.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ETicaretAPI.SignalR.HubsServices
{
    internal class OrderHubService : IOrderHubService
    {
        readonly IHubContext<OrderHub> _hubContext;

        public OrderHubService(IHubContext<OrderHub> hubContext)
        {
            _hubContext = hubContext;
        }

        public async Task OrderAddedMessageAsync(string message)
        {
           await _hubContext.Clients.All.SendAsync(ReceiveFuncName.OrderAddedMessage, message);
        }
    }
}
