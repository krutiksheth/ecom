import {inject, Injectable} from '@angular/core';
import {loadStripe, Stripe, StripeAddressElement, StripeAddressElementOptions, StripeElements} from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BasketService} from "./basket.service";
import {firstValueFrom, map} from "rxjs";
import {Basket} from "../../shared/models/basket";

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  stripePromise: Promise<Stripe | null>;
  basketService = inject(BasketService);
  elements?: StripeElements;
  addressElements?: StripeAddressElement;

  constructor() {
    this.stripePromise = loadStripe(environment.stripePublicKey);
  }

  getStripeInstance() {
    return this.stripePromise;
  }

  async initializeElements() {
    if (!this.elements) {
      const stripe = await this.getStripeInstance();

      if (stripe) {
        const cart = await firstValueFrom(this.createOrUpdatePaymentIntent());
        this.elements = stripe.elements({
          clientSecret: cart.clientSecret,
          appearance: {
            labels: "floating"
          }
        })
      } else
        throw new Error("Stripe not initialized");
    }

    return this.elements;
  }

  async createAddressElement() {
    if (!this.addressElements) {
      const elements = await this.initializeElements();
      if (elements) {
        const options: StripeAddressElementOptions = {
          mode: "shipping",
        };

        this.addressElements = elements.create("address", options);
      } else {
        throw new Error("Elements instance has not been loaded");
      }
    }

    return this.addressElements;
  }

  createOrUpdatePaymentIntent() {
    const basket = this.basketService.basket();
    if (!basket) {
      throw new Error('Problem with basket');
    }
    return this.http.post<Basket>(`${this.baseUrl}payments`, {}).pipe(
      map(updatedBasket => {
        this.basketService.basket.set(updatedBasket);
        return basket;
      })
    )
  }
}
