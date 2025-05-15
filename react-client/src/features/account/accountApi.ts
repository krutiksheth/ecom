import {createApi} from "@reduxjs/toolkit/query/react";
import {baseQueryWithErrorHandling} from "../../app/api/baseApi.ts";
import {User} from "../../app/models/user.ts";

export const accountApi= createApi({
    reducerPath: 'accountApi',
    baseQuery: baseQueryWithErrorHandling,
    endpoints:(builder)=>({
        login: builder.mutation<void, object>({
            query: (creds)=>{
                return {
                    url:"login?userCookies=true",
                    method:"POST",
                    body: creds
                }
            }
        }),
        register: builder.mutation<void, object>({
            query:(register) =>{
                return {
                    url:"account/register",
                    method:"POST",
                    body: register
                }
            }
        }),
        userInfo:builder.query<User, void>({
            query: ()=>{
                return {
                    url: "account/account/user-info",
                }
            }
        }),
        logout: builder.mutation({
            query:()=>{
                return {
                    url: "account/logout",
                    method: "POST"
                }
            }
        })
    })
});

export const { useLoginMutation, useRegisterMutation, useLogoutMutation, useUserInfoQuery } = accountApi;