using U = ETicaretAPI.Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using ETicaretAPI.Application.Exceptions;
using ETicaretAPI.Application.Abstructions.Token;
using ETicaretAPI.Application.DTOs;
using ETicaretAPI.Application.Abstructions.Services;

namespace ETicaretAPI.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandHandler : IRequestHandler<LoginUserCommandRequest, LoginUserCommandResponse>
    {
        readonly IAuthService _authService;

        public LoginUserCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<LoginUserCommandResponse> Handle(LoginUserCommandRequest request, CancellationToken cancellationToken)
        {
            var token = await _authService.Login(request.UsernameOrEmail, request.Password, 1200);
            return new LoginUsersSuccessCommandResponse()
            {
                Token=token
            };
        }
    }
}
