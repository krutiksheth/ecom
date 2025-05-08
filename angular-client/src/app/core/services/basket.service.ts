import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Basket} from "../../shared/models/basket";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private http= inject(HttpClient);
  basket = signal<Basket | null>(null);

  getBasket(id: string){
    return this.http.get<Basket>("api/basket?id="+id).subscribe({
      next: (basket) =>this.basket.set(basket)
    });
  }

  addBasket(basket: Basket){
    return this.http.post<Basket>("api/basket", basket).subscribe({
      next: (basket) =>this.basket.set(basket)
    })
  }
}
