using MediatR;
using System.Reflection.Metadata.Ecma335;

namespace ETicaretAPI.Application.Features.Commands.AppUser.LoginRefleshToken
{
    public class RefleshTokenLoginCommandRequest : IRequest<RefleshTokenLoginCommandResponse>
    {
        public string RefleshToken { get; set; }
    }
}
