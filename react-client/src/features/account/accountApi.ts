import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import {User} from "../../app/models/user.ts";
import {LoginSchema} from "../../lib/schemas/loginSchema.ts";
import {router} from "../../app/routes/Router.tsx";
import {RegisterSchema} from "../../lib/schemas/registerSchema.ts";
import { toast } from "react-toastify";

export const accountApi= createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    tagTypes: ['UserInfo'],
    endpoints:(builder)=>({
        login: builder.mutation<void, LoginSchema>({
            query: (creds)=>{
                return {
                    url:"login?useCookies=true",
                    method:"POST",
                    body: creds
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                }catch (error) {
                    console.log(error)
                }
            }
        }),
        register: builder.mutation<void, RegisterSchema>({
            query:(register) =>{
                return {
                    url:"account/register",
                    method:"POST",
                    body: register
                }
            },
            async onQueryStarted(_, {queryFulfilled}){
                try {
                    await queryFulfilled;
                    toast.success("Registration successful - you can now sign in!")
                    await router.navigate("/login");
                }catch (error) {
                    console.log(error);
                    throw error;
                }
            }
        }),
        userInfo:builder.query<User, void>({
            query: ()=>{
                return {
                    url: "account/user-info",
                }
            },
            providesTags:["UserInfo"]
        }),
        logout: builder.mutation({
            query:()=>{
                return {
                    url: "account/logout",
                    method: "POST"
                }
            },
            async onQueryStarted(_, {dispatch, queryFulfilled}){
                try {
                    await queryFulfilled;
                    dispatch(accountApi.util.invalidateTags(["UserInfo"]));
                    await router.navigate("/catalog");
                }catch (error) {
                    console.log(error)
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery } = accountApi;