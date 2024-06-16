using MediatR;
using ETicaretAPI.Application.Abstructions.Services;
using ETicaretAPI.Application.DTOs.User;

namespace ETicaretAPI.Application.Features.Commands.AppUser.CreateUser
{
    public class CreateUserCommandHandler : IRequestHandler<CreateUserCommandRequest, CreateUserCommandResponse>
    {
        readonly IUserService _userService;

        public CreateUserCommandHandler(IUserService userService)
        {
            _userService = userService;
        }

        public async Task<CreateUserCommandResponse> Handle(CreateUserCommandRequest request, CancellationToken cancellationToken)
        {
            CreateUserResponse response = await _userService.CreateUser(new()
            {
                Email = request.Email,
                NameSurname = request.NameSurname,
                UserName = request.UserName,
                Password = request.Password,
                ConfirmPassword = request.ConfirmPassword
            });
            return new()
            {
                Message = response.Message,
                Success = response.Success
            };
        }
    }
}
