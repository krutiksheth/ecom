import {Component, inject} from '@angular/core';
import {BasketService} from "../../core/services/basket.service";
import {BasketItemComponent} from "./basket-item/basket-item.component";
import {OrderSummaryComponent} from "../../shared/components/order-summary/order-summary.component";
import {EmptyStateComponent} from "../../shared/components/empty-state/empty-state.component";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [
    BasketItemComponent,
    OrderSummaryComponent,
    EmptyStateComponent
  ],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent {
  basketService = inject(BasketService);

}
