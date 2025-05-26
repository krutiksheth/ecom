import {nanoid} from "nanoid";

export type BasketType = {
  basketId: string,
  items: Item[],
  deliveryMethodId?: number,
  clientSecret?: string
  paymentIntentId?: string
}

export type Item = {
  productId: number
  name: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
}

export class Basket implements BasketType {
  deliveryMethodId?: number;
  clientSecret?: string | undefined;
  paymentIntentId?: string | undefined;
  basketId = nanoid();
  items: Item[] = [];
}
