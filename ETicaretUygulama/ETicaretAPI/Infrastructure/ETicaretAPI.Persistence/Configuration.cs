using Microsoft.Extensions.Configuration;

namespace ETicaretAPI.Persistence
{
    static class Configuration
    {
        static public string ConnectionString
        {
            get
            {
                #region Deneme
                //ConfigurationManager configurationManager = new();
                //configurationManager.SetBasePath(Directory.GetCurrentDirectory());
                //configurationManager.AddJsonFile("appsettings.json");

                //return configurationManager.GetConnectionString("PostgreSQL");

                //IConfiguration configuration = new ConfigurationBuilder()
                //    .SetBasePath(Path.Combine(Directory.GetCurrentDirectory(),"../../Presentation/ETicaretAPI.API"))
                //    .AddJsonFile("appsettings.json")
                //    .Build();

                //return configuration.GetConnectionString("PostgreSQL");

                #endregion 
                IConfiguration configuration = new ConfigurationBuilder()
                    .SetBasePath(Directory.GetCurrentDirectory())          
                    .AddJsonFile("appsettings.json")
                    .Build();

                return configuration.GetConnectionString("PostgreSQL");
            }
        }
    }
}
