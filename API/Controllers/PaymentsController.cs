using API.DTOs;
using API.Extensions;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class PaymentsController(PaymentService paymenentService, IBasketService basketService)
    : BaseApiController
{
    [Authorize]
    [HttpPost]
    public async Task<ActionResult<BasketDto>> CreateOrUpdatePaymentIntent()
    {
        var basket = await this.FindBasket(basketService);

        if (basket == null) return BadRequest("Problem with the basket");

        var intent = await paymenentService.CreateOrUpdatePaymentIntent(basket);

        if (intent == null) return BadRequest("Problem creating payment intent");

        basket.PaymentIntentId ??= intent.Id;
        basket.ClientSecret ??= intent.ClientSecret;

        var result = await basketService.AddItemToBasket(basket);

        if (!result)
            return BadRequest("Problem with updating the basket");

        return basket;
    }
}