//make sure to import this one
import {createApi} from "@reduxjs/toolkit/query/react";
import {Product} from "../../app/models/product.ts";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import {ProductParams} from "../../app/models/productParams.ts";
import {filterEmptyValues} from "../../lib/util.ts";

export const catalogApi= createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        fetchProducts: builder.query<Product[],ProductParams>({
            query :(productParams)=>{ 
                
                const filteredParams = filterEmptyValues(productParams);
                
                return{
                    url:"products",
                    params: filteredParams
                }
            }
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