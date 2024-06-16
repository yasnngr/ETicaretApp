using T=ETicaretAPI.Application.DTOs;

namespace ETicaretAPI.Application.Abstructions.Services.Authentications
{
    public interface IExternalAuthentication
    {
        Task<T.Token> GoogleLogin(string idToken,int accessTokenLifeTime);
    }
}
