//make sure to import this one
import {createApi} from "@reduxjs/toolkit/query/react";
import {Product} from "../../app/models/product.ts";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";

export const catalogApi= createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        fetchProducts: builder.query<Product[],void>({
            query :()=>({
                url:"products"
            })
        }),
        fetchProductDetails:builder.query<Product, number>({
            query:(productId)=>({
                url:`products/${productId}`,
            })
        }),
        fetchFilters: builder.query<{brands:string[], types: string[]}, void>({
            query:()=>({
                url:"products/filters"
            })
        })
    })     
})

export const { useFetchProductsQuery, useFetchProductDetailsQuery, useFetchFiltersQuery  } = catalogApi;