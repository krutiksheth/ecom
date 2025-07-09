import {Component, inject, Input, input} from '@angular/core';
import {BasketService} from "../../../core/services/basket.service";
import {CurrencyPipe} from "@angular/common";
import {ConfirmationToken} from "@stripe/stripe-js";
import {AddressPipe} from "../../../shared/pipes/address.pipe";
import {PaymentPipe} from "../../../shared/pipes/payment.pipe";

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [
    CurrencyPipe,
    AddressPipe,
    PaymentPipe
  ],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

  basketService = inject(BasketService);
  @Input() confirmationToken?: ConfirmationToken;
}
