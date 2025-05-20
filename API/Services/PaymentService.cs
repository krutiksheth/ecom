using API.DTOs;
using Stripe;

namespace API.Services;

public class PaymentService(IConfiguration config)
{
    public async Task<PaymentIntent> CreateOrUpdatePaymentIntent(BasketDto basket)
    {
        StripeConfiguration.ApiKey = config["StripeSettings:SecretKey"];
        var service = new PaymentIntentService();
        var intent = new PaymentIntent();
        var subTotal = basket.Items.Sum(x => x.Quantity * x.Price);
        var delivery = subTotal > 10000 ? 0 : 500;

        if (string.IsNullOrEmpty(basket.PaymentIntentId))
        {
            var options = new PaymentIntentCreateOptions
            {
                Amount = subTotal + delivery,
                Currency = "usd",
                PaymentMethodTypes = ["card"]
            };

            intent = await service.CreateAsync(options);
        }
        else
        {
            var options = new PaymentIntentUpdateOptions
            {
                Amount = subTotal + delivery
            };

            await service.UpdateAsync(basket.PaymentIntentId, options);
        }

        return intent;
    }
}