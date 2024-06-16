using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.DTOs;
using MediatR;

namespace ETicaretAPI.Application.Features.Commands.AppUser.LoginRefleshToken
{
    public class RefleshTokenLoginCommandHandler : IRequestHandler<RefleshTokenLoginCommandRequest, RefleshTokenLoginCommandResponse>
    {
        readonly IAuthService _authService;

        public RefleshTokenLoginCommandHandler(IAuthService authService)
        {
            _authService = authService;
        }

        public async Task<RefleshTokenLoginCommandResponse> Handle(RefleshTokenLoginCommandRequest request, CancellationToken cancellationToken)
        {
            Token token = await _authService.LoginRefleshToken(request.RefleshToken);
            return new()
            {
                Token = token
            };
        }
    }
}
