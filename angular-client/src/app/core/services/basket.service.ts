import {inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Basket, Item} from "../../shared/models/basket";
import {Product} from "../../shared/models/product";
import {map} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class BasketService {

  baseUrl = environment.apiUrl;
  private http = inject(HttpClient);
  basket = signal<Basket | null>(null);

  httpOptions = {
    withCredentials: true
  };

  getBasket() {
    return this.http.get<Basket>(this.baseUrl + "basket", this.httpOptions).pipe(
      map(basket => {
        this.basket.set(basket);
        return basket;
      })
    );
  }

  addBasketItem(product: Product | Item, quantity: number) {
    console.log(product);
    const productId = this.isBasketItem(product) ? product.id : product.productId;
    const basket = this.basket() ?? this.createBasket();
    if (this.isBasketItem(product)) {
      basket.items = this.addOrUpdateBasketItem(basket.items, {
        ...product,
        productId: product.id,
        quantity
      }, quantity);
    }

    return this.http.post<Basket>(this.baseUrl + `basket?productId=${productId}&&quantity=${quantity}`, {}, this.httpOptions).subscribe({
      next: (basket) => this.basket.set(basket)
    });
  }

  private addOrUpdateBasketItem(items: Item[], item: Item, quantity: number) {
    const index = items.findIndex(item => item.productId === item.productId);
    if (index === -1) {
      item.quantity = quantity
      items.push(item)
    } else {
      items[index].quantity += quantity;
    }

    return items;
  }

  private createBasket() {
    return new Basket();
  }

  private isBasketItem(product: Product | Item): product is Product {
    return (product as Product).id !== undefined;
  }
}
