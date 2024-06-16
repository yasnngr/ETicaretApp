using ETicaretAPI.Application.DTOs.User;
using ETicaretAPI.Domain.Entities.Identity;

namespace ETicaretAPI.Application.Abstructions.Services
{
    public interface IUserService
    {
        Task<CreateUserResponse> CreateUser(CreateUser model);

        Task UpdateRefleshToken(string refleshToken,AppUser user,DateTime accessTokenDate, int addOnAccessTokenDate);
    }
}
