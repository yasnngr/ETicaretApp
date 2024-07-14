using ETicaretAPI.Application.Abstructions.Hubs;
using ETicaretAPI.SignalR.HubsServices;
using Microsoft.Extensions.DependencyInjection;

namespace ETicaretAPI.SignalR
{
    public static class ServiceRegistration
    {
        public static void AddSignalRServices(this IServiceCollection collection)
        {
            collection.AddTransient<IProductHubService,ProductHubService>();
            collection.AddTransient<IOrderHubService,OrderHubService>();
            collection.AddSignalR();
        }
    }
}
