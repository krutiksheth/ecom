import {Item} from "../app/models/basket.ts";
import {Product} from "../app/models/product.ts";

export function currencyFormat(amount: number) {
    return `$${(amount/100).toFixed(2)}`;
}

export function filterEmptyValues(values:Object) {
    return Object.fromEntries(Object.entries(values).filter(
        ([, value])=> value!=='' && value!== undefined && value.length!==0));
}

export function isBasketItem(product: Product | Item): product is Item{
    return (product as Item).quantity !== undefined;
}