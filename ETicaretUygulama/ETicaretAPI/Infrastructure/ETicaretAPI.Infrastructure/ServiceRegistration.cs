using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.Abstructions.Services.Configurations;
using ETicaretAPI.Application.Abstructions.Storage;
using ETicaretAPI.Application.Abstructions.Token;
using ETicaretAPI.Infrastructure.Services;
using ETicaretAPI.Infrastructure.Services.Configurations;
using ETicaretAPI.Infrastructure.Services.Storage;
using ETicaretAPI.Infrastructure.Services.Token;
using Microsoft.Extensions.DependencyInjection;

namespace ETicaretAPI.Infrastructure
{
    public static class ServiceRegistration
    {
        public static void AddInfrastructureServices(this IServiceCollection serviceCollection)
        {
            serviceCollection.AddScoped<IStorageService, StorageService>();
            serviceCollection.AddScoped<ITokenHandler, TokenHandler>();
            serviceCollection.AddScoped<IMailService, MailService>();
            serviceCollection.AddScoped<IApplicationService, ApplicationService>();
        }
        public static void AddStorage<T>(this IServiceCollection serviceCollection) where T : Storage,IStorage
        {
            serviceCollection.AddScoped<IStorage, T>();
        }
    }
}
