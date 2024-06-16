using U = ETicaretAPI.Domain.Entities.Identity;
using MediatR;
using Microsoft.AspNetCore.Identity;
using Google.Apis.Auth;
using ETicaretAPI.Domain.Entities.Identity;
using ETicaretAPI.Application.Abstructions.Token;
using ETicaretAPI.Application.DTOs;
using ETicaretAPI.Application.Abstructions.Services;

namespace ETicaretAPI.Application.Features.Commands.AppUser.GoogleLogin
{
    public class GoogleLoginCommandHandler : IRequestHandler<GoogleLoginCommandRequest, GoogleLoginCommandResponse>
    {
       readonly IAuthService _authService;

        public GoogleLoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<GoogleLoginCommandResponse> Handle(GoogleLoginCommandRequest request, CancellationToken cancellationToken)
        {
           var token = await _authService.GoogleLogin(request.IdToken, 900);
            return new()
            {
                Token = token,
            };
        }
    }
}
