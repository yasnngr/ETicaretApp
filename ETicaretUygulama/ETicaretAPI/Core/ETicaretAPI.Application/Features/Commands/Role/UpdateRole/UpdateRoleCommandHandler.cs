using ETicaretAPI.Application.Abstructions.Services;
using MediatR;

namespace ETicaretAPI.Application.Features.Commands.Role.UpdateRole
{
    public class UpdateRoleCommandHandler : IRequestHandler<UpdateRoleCommandRequest, UpdateRoleCommandResponse>
    {
        readonly IRoleService _roleService;

        public UpdateRoleCommandHandler(IRoleService roleService)
        {
            _roleService = roleService;
        }

        public async Task<UpdateRoleCommandResponse> Handle(UpdateRoleCommandRequest request, CancellationToken cancellationToken)
        {
            var resutl = await _roleService.UpdateRole(request.Id,request.Name);
            return new()
            {
                Succeeded = resutl
            };
        }
    }
}
