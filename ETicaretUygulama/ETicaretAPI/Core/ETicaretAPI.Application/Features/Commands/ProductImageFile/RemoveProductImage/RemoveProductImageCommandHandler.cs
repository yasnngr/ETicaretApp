using ETicaretAPI.Application.Repositories;
using P = ETicaretAPI.Domain.Entities;
using MediatR;
using static System.Net.Mime.MediaTypeNames;
using Microsoft.EntityFrameworkCore;

namespace ETicaretAPI.Application.Features.Commands.ProductImageFile.RemoveProductImage
{
    public class RemoveProductImageCommandHandler : IRequestHandler<RemoveProductImageCommandRequest, RemoveProductImageCommandResponse>
    {
        readonly IProductReadRepository _productReadRepository;
        readonly IProductWriteRepository _productWriteRepository;
        public RemoveProductImageCommandHandler(IProductReadRepository productReadRepository, IProductWriteRepository productWriteRepository)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
        }
        public async Task<RemoveProductImageCommandResponse> Handle(RemoveProductImageCommandRequest request, CancellationToken cancellationToken)
        {
           P.Product? product = await _productReadRepository.Table.Include(p=> p.ProductImagesFile)
                .FirstOrDefaultAsync(p => p.Id == Guid.Parse(request.Id));
            P.ProductImageFile? productImageFile = product?.ProductImagesFile.FirstOrDefault(p => p.Id == Guid.Parse(request.ImageId));
            if (productImageFile != null)
                product?.ProductImagesFile.Remove(productImageFile);
            await _productWriteRepository.SaveAsync();
            return new();
        }
    }
}
