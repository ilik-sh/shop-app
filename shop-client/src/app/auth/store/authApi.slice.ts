import { apiSlice } from "api/apiSlice"

interface Order {
    id: string,
    items: OrderItem[]
    total: number
}

interface OrderItem {
    quantity: number
}

interface Tokens {
    accessToken: string,
    refreshToken: string
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        signUp: builder.mutation({
            query: (body: {email: string, password: string, username: string}) => ({
                url: '/auth/signup',
                method: 'POST',
                body
            })
        }),
        signIn: builder.mutation({
        query: (body: {email: string, password: string}) => ({
            url: '/auth/signin',
            method: 'POST',
            body
            })
        }),
        getCart: builder.query<Order, void>({
        query:  () => ({
            url: '/order/cart'
            }),
        })
    })
})

export const {useSignInMutation, useSignUpMutation, useLazyGetCartQuery} = authApiSlice