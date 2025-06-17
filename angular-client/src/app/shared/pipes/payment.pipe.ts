import { Pipe, PipeTransform } from '@angular/core';
import {ConfirmationToken} from "@stripe/stripe-js";
import PaymentMethodPreview = ConfirmationToken.PaymentMethodPreview;

@Pipe({
  name: 'payment',
  standalone: true
})
export class PaymentPipe implements PipeTransform {

  transform(value?: PaymentMethodPreview, ...args: unknown[]): unknown {
    if(value?.card){
      const {brand, last4, exp_month, exp_year} = value.card;

      return `${brand.toUpperCase()} ending in **** **** **** ${last4}, expires ${exp_month}/${exp_year}`;
    }
    else{
      return "unknown payment method";
    }
  }

}
