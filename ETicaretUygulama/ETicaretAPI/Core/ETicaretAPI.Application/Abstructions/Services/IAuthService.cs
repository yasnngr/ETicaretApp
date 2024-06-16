using ETicaretAPI.Application.Abstructions.Services.Authentications;

namespace ETicaretAPI.Application.Abstructions.Services
{
    public interface IAuthService : IExternalAuthentication,IInternalAuthentication
    {
    }
}
