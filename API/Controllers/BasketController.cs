﻿using API.Data;
using API.DTOs;
using API.Entities;
using API.Services;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

public class BasketController(
    StoreContext context,
    IBasketService basketService,
    IMapper mapper) : BaseApiController
{
    private readonly string basketCookieName = "BasketId";

    /*[HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await FindBasket();

        if (basket == null) return NoContent();

        return Ok(mapper.Map<BasketDto>(basket));
    }

    [HttpPost]
    public async Task<ActionResult> AddItemToBasket(int productId, int quantity)
    {
        //get basket
        var basket = await FindBasket();

        //create basket
        basket ??= CreateBasket();

        //get product
        var product = await context.Products.FindAsync(productId);

        if (product == null)
            return BadRequest("Problem adding item to Basket");

        //add item to basket
        basket.AddItem(product, quantity);

        //save changes
        var result = await context.SaveChangesAsync() > 0;

        if (!result)
        {
            return BadRequest("Problem updating item to Basket");
        }

        // This returns location header 
        return CreatedAtAction(nameof(GetBasket), mapper.Map<BasketDto>(basket));
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        //get basket
        var basket = await FindBasket();

        if (basket == null) return BadRequest("Problem remove item to Basket");

        //remove item or reduce quantity
        basket.RemoveItem(productId, quantity);

        //save changes
        await context.SaveChangesAsync();

        return Ok();
    }

    private Basket CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();

        var cookieOption = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTimeOffset.UtcNow.AddDays(30),
        };

        Response.Cookies.Append(basketCookieName, basketId, cookieOption);

        var basket = new Basket
        {
            BasketId = basketId,
        };

        context.Baskets.Add(basket);

        return basket;
    }

    private async Task<Basket> FindBasket()
    {
        Request.Cookies.TryGetValue(basketCookieName, out string basketId);

        return await context.Baskets
            .Include(x => x.Items)
            .ThenInclude(x => x.Product)
            .FirstOrDefaultAsync(x => x.BasketId == basketId);
    }*/

    #region "Redis"

    [HttpGet]
    public async Task<ActionResult<Basket>> GetBasket()
    {
        var basket = await FindBasket();

        return Ok(basket);
    }

    [HttpPost]
    public async Task<ActionResult<BasketDto>> AddItemToBasket(int productId, int quantity)
    {
        var product = await context.Products.FindAsync(productId);
        
        if (product == null)
            return BadRequest("Problem adding item to Basket");
        
        var basket = await FindBasket() ?? CreateBasket();
        
        basket.AddItem(product, quantity);

        var result = await basketService.AddItemToBasket(basket);
        
        if (!result) return BadRequest("Problem adding item from Basket");
        
        return CreatedAtAction(nameof(GetBasket), basket);
    }

    [HttpDelete]
    public async Task<ActionResult> RemoveItemFromBasket(int productId, int quantity)
    {
        //get basket
        var basket = await FindBasket();

        if (basket == null) return BadRequest("Problem remove item to Basket");

        //remove item or reduce quantity
        basket.RemoveItem(productId, quantity);
        
        var result = await basketService.RemoveItemFromBasket(basket);

        if (!result) return BadRequest("Problem removing item from Basket");
        
        return Ok();
    }

    private async Task<BasketDto> FindBasket()
    {
        Request.Cookies.TryGetValue(basketCookieName, out string basketId);
        
        if(string.IsNullOrEmpty(basketId)) return null;
        
        return await basketService.GetBasket(basketId);
    }
    
    private BasketDto CreateBasket()
    {
        var basketId = Guid.NewGuid().ToString();

        var cookieOption = new CookieOptions
        {
            IsEssential = true,
            Expires = DateTimeOffset.UtcNow.AddDays(30),
        };

        Response.Cookies.Append(basketCookieName, basketId, cookieOption);

        var basket = new BasketDto
        {
            BasketId = basketId,
        };

        return basket;
    }

    #endregion
}