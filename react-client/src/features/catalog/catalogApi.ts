//make sure to import this one
import {createApi} from "@reduxjs/toolkit/query/react";
import {Product} from "../../app/models/product.ts";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import {ProductParams} from "../../app/models/productParams.ts";
import {filterEmptyValues} from "../../lib/util.ts";
import {Pagination} from "../../app/models/pagination.ts";

export const catalogApi= createApi({
    reducerPath: 'catalogApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        fetchProducts: builder.query<{ items:Product[], pagination: Pagination },ProductParams>({
            query :(productParams)=>{ 
                
                const filteredParams = filterEmptyValues(productParams);
                
                return{
                    url:"products",
                    params: filteredParams
                }
            },
            transformResponse:(items: Product[], meta)=>{
                const paginationHeader = meta?.response?.headers.get("pagination");
                const pagination = paginationHeader? JSON.parse(paginationHeader): null;
                
                return {items, pagination}
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