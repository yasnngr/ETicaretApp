﻿using Microsoft.Extensions.DependencyInjection;
using System.Reflection;

namespace ETicaretAPI.Application
{
    public static class ServiceRegistration
    {
        public static void AddApplicationService(this IServiceCollection collection)
        {
            collection.AddMediatR(cfg=>cfg.RegisterServicesFromAssemblies(Assembly.GetExecutingAssembly())); 
        }
    }
}
