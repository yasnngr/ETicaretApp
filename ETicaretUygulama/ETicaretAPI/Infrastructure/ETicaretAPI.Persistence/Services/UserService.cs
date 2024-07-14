using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.DTOs.User;
using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Application.Helpers;
using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using ETicaretAPI.Domain.Entities.Identity;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Persistence.Services
{
    public class UserService : IUserService
    {
        readonly UserManager<AppUser> _userManager;
        readonly IEndpointReadRepository _endpointReadRepository;

        public UserService(UserManager<AppUser> userManager, IEndpointReadRepository endpointReadRepository)
        {
            _userManager = userManager;
            _endpointReadRepository = endpointReadRepository;
        }

        public async Task<CreateUserResponse> CreateUserAsync(CreateUser model)
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


        public async Task UpdateRefleshTokenAsync(string refleshToken, AppUser user,DateTime accessTokenDate, int addOnAccessTokenDate)
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

        public async Task UpdatePasswordAsync(string userId, string resetToken, string newPassword)
        {
            AppUser? user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                resetToken = resetToken.UrlDecode();
                IdentityResult result = await _userManager.ResetPasswordAsync(user, resetToken,newPassword);
                if (result.Succeeded)
                    await _userManager.UpdateSecurityStampAsync(user);
                else
                    throw new PasswordChangeFailedExcepiton();
            }
        }

        public async Task<List<ListUser>> GetAllUsersAsync(int page, int size)
        {
          var users =  await _userManager.Users
                .Skip(page * size)
                .Take(size)
                .ToListAsync();

            return users.Select(user => new ListUser
            {
                Id = user.Id,
                Email = user.Email,
                NameSurname = user.NameSurname,
                TwoFactorEnabled = user.TwoFactorEnabled,
                UserName = user.UserName,

            }).ToList();
        }

        public int TotalUsersCount => _userManager.Users.Count();

        public async Task AssignRoleToUserAsync(string userId, string[] roles)
        {
            AppUser user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                var userRole = await _userManager.GetRolesAsync(user);
                await _userManager.RemoveFromRolesAsync(user, userRole);

                await _userManager.AddToRolesAsync(user, roles);
            }
        }

        public async Task<string[]> GetRolesToUserAsync(string userIdOrName)
        {
            AppUser? user = await _userManager.FindByIdAsync(userIdOrName);
            if (user == null)
               user = await _userManager.FindByNameAsync(userIdOrName);            
            
            if (user != null)
            {
               var userRoles = await _userManager.GetRolesAsync(user);
               return userRoles.ToArray();
            }
            return new string[] { };
        }

        public async Task<bool> HasRolePermissionToEndpointAsync(string name, string code)
        {
            var userRoles = await GetRolesToUserAsync(name);

            if (!userRoles.Any()) 
                return false;
            
            Endpoint? endpoint = await _endpointReadRepository.Table
                .Include(e => e.Roles)
                .FirstOrDefaultAsync(e => e.Code == code);

            if (endpoint == null) 
                return false;

            var hasRole = false;
            var endpointRoles = endpoint.Roles.Select(r => r.Name);
            //foreach (var userRole in userRoles)
            //{
            //    if (!hasRole)
            //    {
            //        foreach (var endpointRole in endpointRoles)
            //            if (userRole == endpointRole)
            //            {
            //                hasRole = true;
            //                break;
            //            }
            //    }
            //    else
            //        break;

            //}
            //return hasRole;
            foreach (var userRole in userRoles)
            {
                foreach (var endpointRole in endpointRoles)
                    if (userRole == endpointRole)
                        return true;
            }
            return false;
        }
    }
}
