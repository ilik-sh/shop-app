import { apiSlice } from "api/apiSlice"
import { OrderItem } from "../types/orderItem"

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getCart: builder.query<OrderItem[], void>({
            query:  () => ({
                url: '/order/cart'
                }),
        }),
        addItemToCart: builder.mutation({
            query: () => ({
                url: '/order',
                method: 'POST'
            })
        })
    })
})

export const {useSignInMutation, useSignUpMutation, useLazyGetCartQuery} = authApiSlice