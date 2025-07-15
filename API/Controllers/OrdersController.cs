using API.Data;
using API.DTOs;
using API.Entities.OrderAggregate;
using API.Extensions;
using API.RequestHelpers;
using API.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[Authorize]
public class OrdersController(StoreContext context, IBasketService basketService) : BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<List<Order>>> GetOrders()
    {
        var orders = await context
            .Orders
            .Include(x => x.OrderItems)
            .Where(x => x.BuyerEmail == User.GetUserName())
            .ToListAsync();

        return orders;
    }

    [HttpGet("{id:int}")]
    public async Task<ActionResult<Order>> GetOrderDetails(int id)
    {
        var order = await context
            .Orders
            .FirstOrDefaultAsync(x => x.Id == id && x.BuyerEmail == User.GetUserName());

        if (order == null) return NotFound();

        return order;
    }

    [HttpPost]
    public async Task<ActionResult<Order>> CreateOrder(CreateOrderDto orderDto)
    {
        var basket = await this.FindBasket(basketService);

        if (basket == null || !basket.Items.Any())
            return BadRequest(new ProblemDetails { Title = "Your basket is empty" });

        var items = CreateOrderItems(basket.Items);
        var subtotal = items.Sum(item => item.Price * item.Quantity);
        var deliveryFee = CalculateDeliveryFee(subtotal);

        var order = new Order
        {
            OrderItems = items,
            BuyerEmail = User.GetUserName(),
            ShippingAddress = orderDto.ShippingAddress,
            Subtotal = subtotal,
            PaymentSummary = orderDto.PaymentSummary,
            PaymentIntentId = basket.PaymentIntentId
        };

        context.Orders.Add(order);

        await basketService.RemoveBasket(basket.BasketId);
        Response.Cookies.Delete(Constants.BasketCookieName);

        var result = await context.SaveChangesAsync() > 0;

        if (!result) return BadRequest("Problem creating order");

        return CreatedAtAction(nameof(GetOrderDetails), new { id = order.Id }, order);
    }

    private long CalculateDeliveryFee(long subtotal)
    {
        return subtotal > 10000 ? 0 : 500;
    }

    private List<OrderItem> CreateOrderItems(List<BasketItemDto> basketItems)
    {
        var orderItems = new List<OrderItem>();

        foreach (var basketItem in basketItems)
        {
           
            orderItems.Add(new OrderItem
            {
                ItemOrdered = new ProductItemOrdered
                {
                    Name = basketItem.Name,
                    PictureUrl = basketItem.PictureUrl,
                    ProductId = basketItem.ProductId
                },
                Quantity = basketItem.Quantity,
                Price = basketItem.Price
            });
        }

        return orderItems;
    }
}