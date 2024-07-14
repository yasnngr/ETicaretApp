using Microsoft.EntityFrameworkCore;
using ETicaretAPI.Persistence.Contexts;
using Microsoft.Extensions.DependencyInjection;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Persistence.Repositories;
using ETicaretAPI.Domain.Entities.Identity;
using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Persistence.Services;
using ETicaretAPI.Application.Abstructions.Services.Authentications;
using Microsoft.AspNetCore.Identity;

namespace ETicaretAPI.Persistence
{
    public static class ServiceRegistration
    {
        public static void AddPersistenceServices(this IServiceCollection services)//IOC container'a dataları yolluyoruz(Program.cs)
        {
            services.AddDbContext<ETicaretAPIDbContext>(option => option.UseNpgsql(Configuration.ConnectionString));
            services.AddIdentity<AppUser, AppRole>(opt =>
            {
                opt.Password.RequiredLength = 5;
                opt.User.RequireUniqueEmail = true;
            }).AddEntityFrameworkStores<ETicaretAPIDbContext>()
                .AddDefaultTokenProviders();
            services.AddScoped<ICustomerReadRepository,CustomerReadRepository>();
            services.AddScoped<ICustomerWriteRepository,CustomerWriteRepository>();
            services.AddScoped<IOrderReadRepository,OrderReadRepository>();
            services.AddScoped<IOrderWriteRepository,OrderWriteRepository>();
            services.AddScoped<IProductReadRepository,ProductReadRepository>();
            services.AddScoped<IProductWriteRepository,ProductWriteRepository>();
            services.AddScoped<IInvoiceFileWriteRepository,InvoiceFileWriteRepository>();
            services.AddScoped<IInvoiceFileReadRepository,InvoiceFileReadRepository>();
            services.AddScoped<IProductImageFileReadRepository,ProductImageFileReadRepository>();
            services.AddScoped<IProductImageFileWriteRepository,ProductImageFileWriteRepository>();
            services.AddScoped<IFileReadRepository,FileReadRepository>();
            services.AddScoped<IFileWriteRepository,FileWriteRepository>();
            services.AddScoped<IBasketReadRepository,BasketReadRepository>();
            services.AddScoped<IBasketWriteRepository,BasketWriteRepository>();
            services.AddScoped<IBasketItemReadRepository,BasketItemReadRepository>();
            services.AddScoped<IBasketItemWriteRepository,BasketItemWriteRepository>();
            services.AddScoped<ICompletedOrderReadRepository,CompletedOrderReadRepository>();
            services.AddScoped<ICompletedOrderWriteRepository,CompletedOrderWriteRepository>();
            services.AddScoped<IMenuReadRepository,MenuReadRepository>();
            services.AddScoped<IMenuWriteRepository,MenuWriteRepository>();
            services.AddScoped<IEndpointReadRepository,EndpointReadRepository>();
            services.AddScoped<IEndpointWriteRepository,EndpointWriteRepository>();

            services.AddScoped<IUserService, UserService>();
            services.AddScoped<IAuthService, AuthService>();
            services.AddScoped<IExternalAuthentication,AuthService>();
            services.AddScoped<IInternalAuthentication, AuthService>();
            services.AddScoped<IBasketService, BasketService>();
            services.AddScoped<IOrderService,OrderService>();
            services.AddScoped<IRoleService,RoleService>();
            services.AddScoped<IAuthorizationEndpointService,AuthorizationEndpointService>();
        }
    }
}
