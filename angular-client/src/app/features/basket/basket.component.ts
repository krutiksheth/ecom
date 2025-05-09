import {Component, inject, OnInit, signal} from '@angular/core';
import {BasketService} from "../../core/services/basket.service";
import {Basket} from "../../shared/models/basket";

@Component({
  selector: 'app-basket',
  standalone: true,
  imports: [],
  templateUrl: './basket.component.html',
  styleUrl: './basket.component.scss'
})
export class BasketComponent implements OnInit {

  basketService = inject(BasketService);
  ngOnInit(): void {
    this.getBaskets();
  }

  getBaskets() {
      this.basketService.getBasket();
  }
}
