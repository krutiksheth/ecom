import {Component, inject} from '@angular/core';
import {BasketService} from "../../../core/services/basket.service";
import {CurrencyPipe} from "@angular/common";

@Component({
  selector: 'app-checkout-review',
  standalone: true,
  imports: [
    CurrencyPipe
  ],
  templateUrl: './checkout-review.component.html',
  styleUrl: './checkout-review.component.scss'
})
export class CheckoutReviewComponent {

  basketService = inject(BasketService);
}
