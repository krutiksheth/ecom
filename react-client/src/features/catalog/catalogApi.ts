//make sure to import this one
import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {Product} from "../../app/models/product.ts";

export const catalogApi= createApi({
    reducerPath: 'catalogApi',
    baseQuery:fetchBaseQuery({ baseUrl:'https://localhost:5001/api'}),
    endpoints:(builder)=>({
        fetchProducts: builder.query<Product[],void>({
            query :()=>({
                url:"products"
            })
        }),
        fetchProductDetails:builder.query<Product, number>({
            query:(productId)=>({
                url:`product/${productId}`,
            })
        })
    })     
})

export const { useFetchProductsQuery, useFetchProductDetailsQuery } = catalogApi;