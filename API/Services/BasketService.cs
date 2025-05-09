using System.Text.Json;
using API.DTOs;
using API.Entities;
using StackExchange.Redis;

namespace API.Services;

public class BasketService(IConnectionMultiplexer redis) : IBasketService
{
    private readonly IDatabase _database = redis.GetDatabase();

    public async Task<BasketDto> GetBasket(string key)
    {
        var data = await _database.StringGetAsync(key);
        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<BasketDto>(data);
    }
    
    public async Task<bool> AddItemToBasket(BasketDto basket)
    {
        var existingBasket = await GetBasket(basket.BasketId);

        if (existingBasket != null)
        {
            var expiry = _database.KeyTimeToLive(basket.BasketId);
         
            return await _database.StringSetAsync(basket.BasketId,JsonSerializer.Serialize(basket), expiry);
        }
        else
        {
            return await _database.StringSetAsync(
                basket.BasketId,
                JsonSerializer.Serialize(basket),
                TimeSpan.FromDays(30));
        }
    }

    public async Task<bool> RemoveItemFromBasket(BasketDto basket)
    {
        var expiry = _database.KeyTimeToLive(basket.BasketId);

        if (basket.Items.Count == 0)
        {
           return await _database.KeyDeleteAsync(basket.BasketId);
        }
        else
        {
           return await _database.StringSetAsync(basket.BasketId,JsonSerializer.Serialize(basket), expiry);
        }
    }
}