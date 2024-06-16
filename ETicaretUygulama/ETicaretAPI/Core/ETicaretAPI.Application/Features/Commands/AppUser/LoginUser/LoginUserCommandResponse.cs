using ETicaretAPI.Application.DTOs;

namespace ETicaretAPI.Application.Features.Commands.AppUser.LoginUser
{
    public class LoginUserCommandResponse
    {

    }
    public class LoginUsersSuccessCommandResponse : LoginUserCommandResponse 
    { 
        public Token Token { get; set; }
    }
    public class LoginUsersErrorCommandResponse:LoginUserCommandResponse 
    { 
        public string Message { get; set; }
    }
}
