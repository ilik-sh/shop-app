import { apiSlice } from "api/apiSlice"
import { OrderItem } from "../types/orderItem"

interface Order {
    id: string,
    items: OrderItem[]
    total: number
}

const authApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
      

        addItemToCart: builder.mutation({
            query: (productId: string) => ({
                url: '/order/addItem',
                method: 'PATCH',
                body: {
                    productId: productId,
                    quantity: 1
                }
            })
        }),

        removeItemFromCart: builder.mutation({
            query: (body: {orderItemId: string}) => ({
                url: '/order/item',
                method: 'DELETE',
                body
            })
        }),

        updateItemQuantity: builder.mutation<OrderItem, {orderItemId: string}>({
            query: (body: {orderItemId: string}) => ({
                url: 'order/itemQuantity',
                method: 'PATCH',
                body
            })
        }),

        getCart: builder.query<Order, void>({
            query: () => ({
                url: 'order/cart'
            })
        })
    })
})

export const {useRemoveItemFromCartMutation, useAddItemToCartMutation, useUpdateItemQuantityMutation, useGetCartQuery} = authApiSlice