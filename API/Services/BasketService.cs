using System.Text.Json;
using API.Entities;
using StackExchange.Redis;

namespace API.Services;

public class BasketService(IConnectionMultiplexer redis) : IBasketService
{
    private readonly IDatabase _database = redis.GetDatabase();

    public async Task<Basket> GetBasket(string key)
    {
        var data = await _database.StringGetAsync(key);

        return data.IsNullOrEmpty ? null : JsonSerializer.Deserialize<Basket>(data);
    }

    public async Task<Basket> AddItemToBasket(Basket basket)
    {
        var created = await _database.StringSetAsync(
            basket.BasketId,
            JsonSerializer.Serialize(basket),
            TimeSpan.FromDays(30));

        if (!created) return null;

        return await GetBasket(basket.BasketId);
    }

    public async Task<bool> RemoveItemFromBasket(string key)
    {
        return await _database.KeyDeleteAsync(key);
    }
}