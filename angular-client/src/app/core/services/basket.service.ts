import {computed, inject, Injectable, signal} from '@angular/core';
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {Basket, Item} from "../../shared/models/basket";
import {Product} from "../../shared/models/product";
import {map} from "rxjs";
import {CookieService} from "ngx-cookie-service";

@Injectable({
    providedIn: 'root'
})
export class BasketService {

    baseUrl = environment.apiUrl;
    private http = inject(HttpClient);
    basket = signal<Basket | null>(null);
    cookieService = inject(CookieService);
    basketCookieName ="BasketId";
    itemCount = computed(() => {
        return this.basket()?.items.reduce((sum, item) => sum + item.quantity, 0);
    });

    totals = computed(() => {
        const basket = this.basket();
        if (!basket) return null;
        const subtotal = basket.items.reduce((sum, item) => (sum + (item.price/100) * item.quantity), 0);
        const shipping = 0;
        const discount = 0;
        return {
            subtotal,
            shipping,
            discount,
            total: (subtotal + shipping - discount)
        }
    })

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

    removeBasketItem(productId: number, quantity: number) {
        const current = this.basket();

        if (!current) return;

        const basket = {...current};
        const index = basket.items?.findIndex(item => item.productId === productId) ?? 0;
        const item = basket.items[index];

        if (index >= 0) {
            basket.items[index].quantity -= quantity;

            if (item.quantity <= 0) {
                basket.items.splice(index, 1);
            }
        }

        this.basket.set(basket);

        return this.http.delete(this.baseUrl + `basket?productId=${productId}&&quantity=${quantity}`, this.httpOptions).subscribe({
            next:()=>{
                if(basket.items.length ===0){
                    this.cookieService.delete(this.basketCookieName);
                }
            },
            error: () => this.basket.set(current),
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
