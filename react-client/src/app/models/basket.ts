export type Basket ={
    id: number
    basketId: string
    items: BasketItem[]
}

export type BasketItem ={
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
}