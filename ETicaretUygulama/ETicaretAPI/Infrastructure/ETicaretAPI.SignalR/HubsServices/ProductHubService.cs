using ETicaretAPI.Application.Abstructions.Hubs;
using ETicaretAPI.SignalR.Hubs;
using Microsoft.AspNetCore.SignalR;

namespace ETicaretAPI.SignalR.HubsServices
{
    public class ProductHubService : IProductHubService
    {
        readonly IHubContext<ProductHub> _hubContext;
        public ProductHubService(IHubContext<ProductHub> hubContext)
        {
            _hubContext = hubContext;
        }
        public async Task ProductAddedMessageAsync(string message)
        {
           await _hubContext.Clients.All.SendAsync(ReceiveFuncName.ProductAddedMessage, message);
        }
    }
}
