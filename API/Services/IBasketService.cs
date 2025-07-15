using API.DTOs;

namespace API.Services;

public interface IBasketService
{
    Task<BasketDto?> GetBasket(string key);

    Task<bool> AddItemToBasket(BasketDto basket);

    Task<bool> RemoveItemFromBasket(BasketDto basket);
    Task<bool> RemoveBasket(string key);
}