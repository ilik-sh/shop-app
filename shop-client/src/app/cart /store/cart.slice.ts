import { createSlice } from "@reduxjs/toolkit"
import { OrderItem } from "../types/orderItem"

interface CartState {
        items: OrderItem[]
        total: number  
}

const initialState: CartState = {
        items: [],
        total: 0
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action) => {
            const item = action.payload
            state.items.push(item)
        },
        removeItemFromCart: (state, action) => {
            const {item} = action.payload
            state.items = state.items.filter(filterItem => 
                filterItem.product.id != item.product.id)
        },
        changeItemQuantity: (state, action) => {
            const {item} = action.payload 
            const index = state.items.findIndex(findItem => 
                findItem.product.id == item.product.id)
            state.items[index].quantity = item.quantity
        },
        clearCart: (state) => {
            state.items = []
            state.total = 0
        }
    }
})

export const {removeItemFromCart, addItemToCart, changeItemQuantity, clearCart} = cartSlice.actions

export default cartSlice