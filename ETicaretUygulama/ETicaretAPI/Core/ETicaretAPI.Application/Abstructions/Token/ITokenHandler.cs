
using ETicaretAPI.Application.DTOs;
using ETicaretAPI.Domain.Entities.Identity;
using T=ETicaretAPI.Application.DTOs;

namespace ETicaretAPI.Application.Abstructions.Token
{
    public interface ITokenHandler
    {
        T.Token CreateAccessToken(int second,AppUser user);
        string CreateRefleshToken();
    }
}
