import {inject, Injectable} from '@angular/core';
import {
  loadStripe,
  Stripe,
  StripeAddressElement,
  StripeAddressElementOptions,
  StripeElements,
  StripePaymentElement
} from "@stripe/stripe-js";
import {environment} from "../../../environments/environment";
import {HttpClient} from "@angular/common/http";
import {BasketService} from "./basket.service";
import {firstValueFrom, map} from "rxjs";
import {Basket} from "../../shared/models/basket";
import {AccountService} from "./account.service";

@Injectable({
  providedIn: 'root'
})
export class StripeService {
  baseUrl = environment.apiUrl;
  http = inject(HttpClient);
  accountService = inject(AccountService);
  stripePromise: Promise<Stripe | null>;
  basketService = inject(BasketService);
  elements?: StripeElements;
  addressElements?: StripeAddressElement;
  paymentElement?: StripePaymentElement;

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

  async createPaymentElement() {
    if (!this.paymentElement) {
      const elements = await this.initializeElements();
      if (elements) {
        this.paymentElement = elements.create("payment");
      } else {
        throw new Error("Element instance has not been initialized");
      }
    }

    return this.paymentElement;
  }

  async createAddressElement() {
    if (!this.addressElements) {
      this.accountService.getAddresses();
      const elements = await this.initializeElements();
      let defaultValues: StripeAddressElementOptions['defaultValues'] = {};

      if (elements) {
        const address = this.accountService.address;

        if (address) {
          defaultValues.name = address.name;
          defaultValues.address = {
            line1: address.line1,
            line2: address.line2,
            city: address.city,
            state: address.state,
            country: address.country,
            postal_code: address.postal_code,
          };
        }

        console.log("defaultValues", defaultValues);

        const options: StripeAddressElementOptions = {
          mode: "shipping",
          defaultValues: defaultValues
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

  async createConfirmationToken() {
    const stripe = await this.getStripeInstance();
    const elements = await this.initializeElements();
    const result = await elements.submit();

    if (result.error) {
      throw new Error(result.error.message);
    }

    if (stripe) {
      return await stripe.createConfirmationToken({elements});
    } else {
      throw new Error("Stripe not initialized");
    }
  }


  disposeElements() {
    this.elements = undefined;
    this.addressElements = undefined;
    this.paymentElement = undefined;
  }
}
