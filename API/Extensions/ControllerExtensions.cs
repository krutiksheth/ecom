using API.DTOs;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Mvc;

namespace API.Extensions;

public static class ControllerExtensions
{
    public static async Task<BasketDto> FindBasket(
        this ControllerBase controller,
        IBasketService basketService)
    {
        controller.Request.Cookies.TryGetValue(Constants.BasketCookieName, out var basketId);

        if (string.IsNullOrEmpty(basketId))
            return null;

        return await basketService.GetBasket(basketId);
    }
}