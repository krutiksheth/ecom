export type Basket ={
    id: number
    basketId: string
    items: item[]
}

export type item ={
    productId: number
    name: string
    price: number
    pictureUrl: string
    brand: string
    type: string
    quantity: number
}