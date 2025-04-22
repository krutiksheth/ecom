import {legacy_createStore, configureStore} from "@reduxjs/toolkit";
import counterReducer, {counterSlice} from "../../features/contact/counterReducer.ts";
import {useDispatch, useSelector} from "react-redux";
import {catalogApi} from "../../features/catalog/catalogApi.ts";
import {uiSlice} from "../layout/uiSlice.ts";

export function configureLegacyStore(){
    return legacy_createStore(counterReducer);
}

export const store= configureStore({
    reducer: {
        [catalogApi.reducerPath]: catalogApi.reducer,
        counter: counterSlice.reducer,
        ui: uiSlice.reducer
    },
    middleware:(getDefaultMiddleware)=>
        getDefaultMiddleware().concat(catalogApi.middleware)
})

// Infer the `RootState`,  `AppDispatch`, and `AppStore` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export const useAppSelector = useSelector.withTypes<RootState>()
