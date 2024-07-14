using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.Abstructions.Token;
using ETicaretAPI.Application.DTOs;
using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Application.Helpers;
using ETicaretAPI.Domain.Entities.Identity;
using Google.Apis.Auth;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.WebUtilities;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace ETicaretAPI.Persistence.Services
{
    public class AuthService : IAuthService
    {
        readonly IConfiguration _configuration;
        readonly UserManager<AppUser> _userManager;
        readonly ITokenHandler _tokenHandler;
        readonly SignInManager<AppUser> _signInManager;
        readonly IUserService _userService;
        readonly IMailService _mailService;

        public AuthService(IConfiguration configuration, UserManager<AppUser> userManager, ITokenHandler tokenHandler, SignInManager<AppUser> signInManager, IUserService userService, IMailService mailService)
        {
            _configuration = configuration;
            _userManager = userManager;
            _tokenHandler = tokenHandler;
            _signInManager = signInManager;
            _userService = userService;
            _mailService = mailService;
        }

        async Task<Token> CreateUserExternalAsync(AppUser user, string email, string name ,UserLoginInfo info, int accessTokenLifeTime)
        {
            bool result = user != null;

            if (user == null)
            {
                user = await _userManager.FindByEmailAsync(email);

                if (user == null)
                {
                    user = new()
                    {
                        Id = Guid.NewGuid().ToString(),
                        Email = email,
                        UserName = email,
                        NameSurname = name,
                    };
                    var identityResult = await _userManager.CreateAsync(user);
                    result = identityResult.Succeeded;
                }
            }
            if (result)
            {
                await _userManager.AddLoginAsync(user, info);//AspNetUserLogins
                Token token = _tokenHandler.CreateAccessToken(accessTokenLifeTime,user);
                await _userService.UpdateRefleshTokenAsync(token.RefleshToken, user, token.Expiration,400);
                return token;
            }

            throw new Exception("Invalid external authentication");
        }

        public async Task<Token> GoogleLogin(string idToken, int accessTokenLifeTime)
        {
            var settings = new GoogleJsonWebSignature.ValidationSettings()
            {
                Audience = new List<string> { _configuration["ExternalLoginSettings:Google:Client_ID"] }
            };
            var payload = await GoogleJsonWebSignature.ValidateAsync(idToken, settings);

            var info = new UserLoginInfo("GOOGLE", payload.Subject, "GOOGLE");

            AppUser? user = await _userManager.FindByLoginAsync(info.LoginProvider, info.ProviderKey);

            return await CreateUserExternalAsync(user,payload.Email,payload.Name,info, accessTokenLifeTime);
        }

        public async Task<Token> Login(string usernameOrEmail, string password, int accessTokenLifeTime)
        {
            AppUser? user = await _userManager.FindByNameAsync(usernameOrEmail);
            if (user == null)
                user = await _userManager.FindByEmailAsync(usernameOrEmail);

            if (user == null)
                throw new NotFoundUserException();

            SignInResult result = await _signInManager.CheckPasswordSignInAsync(user, password, false);
            if (result.Succeeded)
            {
                Token token = _tokenHandler.CreateAccessToken(accessTokenLifeTime, user);
                await _userService.UpdateRefleshTokenAsync(token.RefleshToken, user, token.Expiration, 400);

                return token;
            }

            throw new AuthenticationErrorException();
        }

        public async Task<Token> LoginRefleshToken(string refleshToken)
        {
           AppUser? user =await _userManager.Users.FirstOrDefaultAsync(u=>u.RefleshToken==refleshToken);
            if (user != null && user.RefleshTokenLifeTime > DateTime.UtcNow)
            {
                Token token = _tokenHandler.CreateAccessToken(1200,user);
                await _userService.UpdateRefleshTokenAsync(token.RefleshToken, user, token.Expiration, 400);
                return token;
            }
            else
                throw new NotFoundUserException();
        }

        public async Task PasswordResetAsync(string email)
        {
            AppUser? user = await _userManager.FindByEmailAsync(email);
            if(user != null)
            {
                string resetToken = await _userManager.GeneratePasswordResetTokenAsync(user);

                resetToken = resetToken.UrlEncode();

                await _mailService.SendPasswordResentMailAsync(email, user.Id, resetToken);
            }
        }

        public async Task<bool> VerifyResetTokenAsync(string resetToken, string userId)
        {
            AppUser? user = await _userManager.FindByIdAsync(userId);
            if (user != null)
            {
                resetToken = resetToken.UrlDecode();

                return await _userManager.VerifyUserTokenAsync(user, _userManager.Options.Tokens.PasswordResetTokenProvider, "ResetPassword",resetToken);
            }
            return false;
        }
    }
}
