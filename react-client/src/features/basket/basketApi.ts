import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import {Basket, Item} from "../../app/models/basket.ts";
import {Product} from "../../app/models/product.ts";
import {isBasketItem} from "../../lib/util.ts";
import Cookies from "js-cookie";

export const basketApi = createApi({
    reducerPath: 'basketApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ["Basket"],
    endpoints: (builder) => ({
        fetchBasket: builder.query<Basket, void>({
            query: () => ({
                url: `basket`,
            }),
            providesTags: ["Basket"]
        }),
        addBasketItem: builder.mutation<Basket, { product: Product | Item, quantity: number }>({
            query: ({product, quantity}) => {
                const productId = isBasketItem(product) ? product.productId : product.id;

                return {
                    url: `basket?productId=${productId}&&quantity=${quantity}`,
                    method: "POST"
                }
            },
            onQueryStarted: async ({product, quantity}, {dispatch, queryFulfilled}) => {
                let isNewBasket = false;
                const patchResult = dispatch(
                    basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
                        const productId = isBasketItem(product) ? product.productId : product.id;

                        if (!draft?.basketId) isNewBasket = true;

                        if (!isNewBasket) {
                            const existingItem = draft.items.find(item => item.productId === productId);

                            if (existingItem) {
                                existingItem.quantity += quantity
                            } else {
                                draft.items.push(isBasketItem(product) ? product : {
                                    ...product,
                                    productId: product.id,
                                    quantity
                                });
                            }
                        }
                    })
                );

                try {
                    await queryFulfilled;
                    if (isNewBasket)
                        dispatch(basketApi.util.invalidateTags(["Basket"]));
                } catch (error) {
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        removeBasketItem: builder.mutation<void, { productId: number, quantity: number }>({
            query: ({productId, quantity}) => ({
                url: `basket?productId=${productId}&&quantity=${quantity}`,
                method: "DELETE"
            }),
            onQueryStarted: async ({productId, quantity}, {dispatch, queryFulfilled}) => {
                const patchResult = dispatch(
                    basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
                        const index = draft.items.findIndex(item => item.productId === productId);
                        if (index >= 0) {
                            draft.items[index].quantity -= quantity
                            if (draft.items[index].quantity <= 0) {
                                draft.items.splice(index, 1);
                            }
                        }
                    })
                );

                try {
                    await queryFulfilled;
                    //dispatch(basketApi.util.invalidateTags(["Basket"]))
                } catch (error) {
                    console.log(error);
                    patchResult.undo();
                }
            }
        }),
        clearBasket: builder.mutation<void, void>({
            queryFn: () => ({data: undefined}),
            onQueryStarted: (_, {dispatch}) => {
                dispatch(basketApi.util.updateQueryData("fetchBasket", undefined, (draft) => {
                    draft.items = [];
                }));

                Cookies.remove("BasketId");
            }
        })
    })
})

export const {
    useFetchBasketQuery,
    useAddBasketItemMutation,
    useRemoveBasketItemMutation,
    useClearBasketMutation
} = basketApi;

