import {Component, inject, OnInit, signal} from '@angular/core';
import {BasketService} from "../../core/services/basket.service";
import {Basket} from "../../shared/models/basket";
import {BasketItemComponent} from "./basket-item/basket-item.component";
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    BasketItemComponent,
    OrderSummaryComponent
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basketService = inject(BasketService);

}
