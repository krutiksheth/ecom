import {Component, inject, input} from '@angular/core';
import {Item} from "../../../shared/models/basket";
import {RouterLink} from "@angular/router";
import {MatButton, MatIconButton} from "@angular/material/button";
import {MatIcon} from "@angular/material/icon";
import {CurrencyPipe} from "@angular/common";
import {BasketService} from "../../../core/services/basket.service";

@Component({
  selector: 'app-basket-item',
  standalone: true,
  imports: [
    RouterLink,
    MatIconButton,
    MatIcon,
    CurrencyPipe,
    MatButton
  ],
  templateUrl: './basket-item.component.html',
  styleUrl: './basket-item.component.scss'
})
export class BasketItemComponent {
  item = input.required<Item>();
  basketService= inject(BasketService);

  decrementItem() {
    this.basketService.removeBasketItem(this.item().productId, 1);
  }

  incrementItem() {
    this.basketService.addBasketItem(this.item(),1);
  }
}
