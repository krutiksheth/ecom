using API.DTOs;
using API.Entities;

namespace API.Services;

public interface IBasketService
{
    Task<BasketDto?> GetBasket(string key);
    
    Task<bool> AddItemToBasket(BasketDto basket);

    Task<bool> RemoveItemFromBasket(BasketDto basket);
}