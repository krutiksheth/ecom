namespace API.Entities;

public class BasketItem
{
    public int Id { get; set; }

    public int Quantity { get; set; }
    
    //navigation property 1-1 relationship
    public int ProductId { get; set; }

    public required Product Product { get; set; } = null!;
}