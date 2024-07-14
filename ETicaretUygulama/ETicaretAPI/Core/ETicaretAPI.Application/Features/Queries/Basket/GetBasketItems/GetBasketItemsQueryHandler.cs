using ETicaretAPI.Application.Abstructions.Services;
using MediatR;
using Microsoft.Extensions.Configuration;

namespace ETicaretAPI.Application.Features.Queries.Basket.GetBasketItems
{
    public class GetBasketItemsQueryHandler : IRequestHandler<GetBasketItemsQueryRequest,List<GetBasketItemsQueryResponse>>
    {
        readonly IBasketService _basketService;
        readonly IConfiguration _configuration;

        public GetBasketItemsQueryHandler(IBasketService basketService, IConfiguration configuration)
        {
            _basketService = basketService;
            _configuration = configuration;
        }

        public async Task<List<GetBasketItemsQueryResponse>> Handle(GetBasketItemsQueryRequest request, CancellationToken cancellationToken)
        {
           var basketItems = await _basketService.GetBasketItemsAsync();

            return basketItems.Select(ba => new GetBasketItemsQueryResponse
            {
                BasketItemId = ba.Id.ToString(),
                Name = ba.Product.Name,
                Price = ba.Product.Price * ba.Quantity,
                Quantity = ba.Quantity,
                ProductImageFile = ba.Product.ProductImagesFile.FirstOrDefault()
                
            }).ToList();
        }
    }
}
