using ETicaretAPI.Application.DTOs.User;
using ETicaretAPI.Domain.Entities.Identity;

namespace ETicaretAPI.Application.Abstructions.Services
{
    public interface IUserService
    {
        Task<CreateUserResponse> CreateUserAsync(CreateUser model);

        Task UpdateRefleshTokenAsync(string refleshToken,AppUser user,DateTime accessTokenDate, int addOnAccessTokenDate);

        Task UpdatePasswordAsync(string userId, string resetToken, string newPassword);

        Task<List<ListUser>> GetAllUsersAsync(int page, int size);

        int TotalUsersCount {  get; }

        Task AssignRoleToUserAsync(string userId, string[] roles);
        Task<string[]> GetRolesToUserAsync(string userIdOrName);
        Task<bool> HasRolePermissionToEndpointAsync(string name,string code);
    }
}
