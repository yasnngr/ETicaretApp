using ETicaretAPI.Application.Consts;
using ETicaretAPI.Application.CustomAttributes;
using ETicaretAPI.Application.Enums;
using ETicaretAPI.Application.Features.Commands.Basket.AddItemToBasket;
using ETicaretAPI.Application.Features.Commands.Basket.RemoveBasketItem;
using ETicaretAPI.Application.Features.Commands.Basket.UpdateQuantity;
using ETicaretAPI.Application.Features.Queries.Basket.GetBasketItems;
using MediatR;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize(AuthenticationSchemes ="Admin")]
    public class BasketController : ControllerBase
    {
        readonly IMediator _mediator;

        public BasketController(IMediator mediator)
        {
            _mediator = mediator;
        }
        
        [HttpGet]
        [AuthorizeDefinition(Menu =AuthorizeDefinitionConstans.Basket,ActionType = ActionType.Reading,Defination = "Get Basket Items")]
        public async Task<IActionResult>GetBasketItems([FromQuery]GetBasketItemsQueryRequest getBasketItemsQueryRequest)
        {
            List<GetBasketItemsQueryResponse> response = await _mediator.Send(getBasketItemsQueryRequest);
            
            return Ok(response);
        }

        [HttpPost]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstans.Basket, ActionType = ActionType.Writing, Defination = "Add Item To Basket")]
        public async Task<IActionResult> AddItemToBasket(AddItemToBasketCommandRequest addItemToBasketCommandRequest)
        {
            AddItemToBasketCommandResponse response = await _mediator.Send(addItemToBasketCommandRequest);
            
            return Ok(response);
        }

        [HttpPut]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstans.Basket, ActionType = ActionType.Updating, Defination = "Update Quantity")]
        public async Task<IActionResult> UpdateQuantity(UpdateQuantityCommandRequest updateQuantityCommandRequest)
        {
            UpdateQuantityCommandResponse response = await _mediator.Send(updateQuantityCommandRequest);
            
            return Ok(response);
        }

        [HttpDelete("{BasketItemId}")]
        [AuthorizeDefinition(Menu = AuthorizeDefinitionConstans.Basket, ActionType = ActionType.Deleting, Defination = "Remove Basket Item")]
        public async Task<IActionResult> RemoveBasketItem([FromRoute]RemoveBasketItemCommandRequest removeBasketItemCommandRequest)
        {
             RemoveBasketItemCommandResponse response = await _mediator.Send(removeBasketItemCommandRequest);

            return Ok(response);
        }
    }
}
