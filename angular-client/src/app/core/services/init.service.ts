import {inject, Injectable} from '@angular/core';
import {BasketService} from "./basket.service";
import {of} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private basketService = inject(BasketService);

  init(){
    return this.basketService.getBasket()?? of(null);
  }
}
