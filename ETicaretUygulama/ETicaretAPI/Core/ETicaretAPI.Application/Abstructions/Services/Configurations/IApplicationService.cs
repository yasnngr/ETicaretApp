using ETicaretAPI.Application.DTOs.Configuration;

namespace ETicaretAPI.Application.Abstructions.Services.Configurations
{
    public interface IApplicationService
    {
        List<Menu> GetAuthorizeDefinitionEndpoints(Type type);
    }
}
