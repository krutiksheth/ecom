import {createSlice} from "@reduxjs/toolkit";
import {ProductParams} from "../../app/models/productParams.ts";

const initialState :ProductParams= {
    page:1,
    pageSize:8,
    brands:[],
    types:[],
    searchTerm:"",
    orderBy:"name"
}

export  const catalogSlice = createSlice({
    name: 'catalogSlice',
    initialState,
    reducers: {
        setPage: (state, action)=>{
            state.page = action.payload;
        },
        setPageSize: (state, action)=>{
            state.pageSize = action.payload;
        },
        setSearchTerm: (state, action)=>{
            state.searchTerm = action.payload;
            state.page = 1;
        },
        setBrands: (state, action)=>{
            state.brands = action.payload;
            state.page = 1;
        },
        setTypes: (state, action)=>{
            state.types = action.payload;
            state.page = 1;
        },
        setOrderBy: (state, action)=>{
            state.orderBy = action.payload;
            state.page = 1;
        },
        reset: ()=>{
            return initialState;
        }
    }
})

export const  { setPage, setPageSize, setOrderBy, setSearchTerm, setBrands, setTypes, reset } = catalogSlice.actions;