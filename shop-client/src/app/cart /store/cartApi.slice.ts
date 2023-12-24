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
            query: (body: {}) => ({
                url: '/order',
                method: 'POST',
                body
            })
        }),

        removeItemFromCart: builder.mutation({
            query: (body: {orderItemId: string}) => ({
                url: '/order/item',
                method: 'DELETE',
                body
            })
        })
    })
})

export const { useLazyGetCartQuery} = authApiSlice