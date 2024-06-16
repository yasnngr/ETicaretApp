using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.DTOs.User;
using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;

namespace ETicaretAPI.Persistence.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<AppUser> _userManager;

        public UserService(UserManager<AppUser> userManager)
        {
            _userManager = userManager;
        }

        public async Task<CreateUserResponse> CreateUser(CreateUser model)
        {
            IdentityResult result = await _userManager.CreateAsync(new()
            {
                Id = Guid.NewGuid().ToString(),
                Email = model.Email,
                UserName = model.UserName,
                NameSurname = model.NameSurname,
            }, model.Password);

            CreateUserResponse response = new() { Success = result.Succeeded };

            if (result.Succeeded)
                response.Message = "User registration successful";
            else
                foreach (var err in result.Errors)
                    response.Message += $"{err.Description}";

            return response;
        }

        public async Task UpdateRefleshToken(string refleshToken, AppUser user,DateTime accessTokenDate, int addOnAccessTokenDate)
        {
            if (user != null)
            {
                user.RefleshToken = refleshToken;
                user.RefleshTokenLifeTime = accessTokenDate.AddSeconds(addOnAccessTokenDate);
                await _userManager.UpdateAsync(user);
            }
            else
                throw new NotFoundUserException(); 
        }
    }
}
