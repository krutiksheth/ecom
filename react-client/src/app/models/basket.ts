import {Product} from "./product.ts";

export type Basket ={
    id: number
    basketId: string
    items: Item[]
}

export class Item{
    
    constructor(product:Product, quantity:number){
        this.productId = product.id;
        this.name = product.name;
        this.quantity = quantity;
        this.price=product.price;
        this.pictureUrl= product.pictureUrl;
        this.type = product.type;
        this.brand= product.brand;
    }
    
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
}