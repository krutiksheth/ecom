using API.Entities;

namespace API.DTOs;

public class BasketDto
{
    public int Id { get; set; }

    public required string BasketId { get; set; }

    public List<BasketItemDto> Items { get; set; } = [];

    public string? ClientSecret { get; set; }

    public string? PaymentIntentId { get; set; }

    public void AddItem(Product product, int quantity)
    {
        if (product == null)
            ArgumentNullException.ThrowIfNull(product);

        if (quantity <= 0)
            throw new ArgumentException("Quantity must be greater than zero");

        var existingItem = FindItem(product.Id);

        if (existingItem != null)
            existingItem.Quantity += quantity;
        else
            Items.Add(new BasketItemDto
            {
                ProductId = product.Id,
                Brand = product.Brand,
                Price = product.Price,
                Name = product.Name,
                PictureUrl = product.PictureUrl,
                Type = product.Type,
                Quantity = quantity
            });
    }

    public void RemoveItem(int productId, int quantity)
    {
        if (quantity <= 0)
            throw new ArgumentException("Quantity must be greater than zero");

        var existingItem = FindItem(productId);

        if (existingItem == null) return;

        existingItem.Quantity -= quantity;

        if (existingItem.Quantity <= 0)
            Items.Remove(existingItem);
    }

    private BasketItemDto? FindItem(int productId)
    {
        return Items.FirstOrDefault(x => x.ProductId == productId);
    }
}