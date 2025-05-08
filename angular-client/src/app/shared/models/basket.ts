import {nanoid} from "nanoid";
import {Product} from "./product";
export type BasketType ={
  basketId : string,
  items: Item[]
}

export type Item= {
  productId: number
  name: string
  price: number
  pictureUrl: string
  brand: string
  type: string
  quantity: number
}

export class Basket implements BasketType {
  basketId= nanoid();
  items: Item[] =[];
}
