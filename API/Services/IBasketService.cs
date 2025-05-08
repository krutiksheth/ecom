using API.Entities;

namespace API.Services;

public interface IBasketService
{
    Task<Basket?> GetBasket(string key);
    
    Task<Basket?> AddItemToBasket(Basket basket);
    
    Task<bool> RemoveItemFromBasket(string key);
}