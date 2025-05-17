import {inject, Injectable} from '@angular/core';
import {BasketService} from "./basket.service";
import {forkJoin, of} from "rxjs";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class InitService {

  private basketService = inject(BasketService);
  private accountService = inject(AccountService);

  init(){
    const basket$ = this.basketService.getBasket()?? of(null);

    return forkJoin({
      basket: basket$,
      user: this.accountService.getUserInfo(),
    });
  }
}
