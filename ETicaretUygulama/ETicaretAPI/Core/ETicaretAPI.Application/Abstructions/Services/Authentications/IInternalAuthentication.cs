using T=ETicaretAPI.Application.DTOs;

namespace ETicaretAPI.Application.Abstructions.Services.Authentications
{
    public interface IInternalAuthentication
    {
        Task<T.Token> Login(string usernameOrEmail, string password,int accessTokenLifeTime);
        Task<T.Token> LoginRefleshToken(string refleshToken);
    }
}
