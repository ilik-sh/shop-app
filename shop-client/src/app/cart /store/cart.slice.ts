import { createSlice } from "@reduxjs/toolkit"
import { OrderItem } from "../types/orderItem"

interface CartState {
    order: {
        items: OrderItem[]
        total: number
    }
    
}

const initialState: CartState = {
    order: {
        items: [],
        total: 0
    }
}

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            localStorage.setItem('refresh', refreshToken)
            sessionStorage.setItem('access', accessToken)
        },
        addItemToCart: (state, action) => {
            const {item} = action.payload
            state.order.items.push(item)
        },
        removeItemFromCart: (state, action) => {
            const {item} = action.payload
            state.order.items = state.order.items.filter(filterItem => 
                filterItem.product.id != item.product.id)
        },
        changeItemQuantity: (state, action) => {
            const {item} = action.payload 
            const index = state.order.items.findIndex(findItem => 
                findItem.product.id == item.product.id)
            state.order.items[index].quantity = item.quantity
        },
        clearCart: (state) => {
            state.order.items = []
            state.order.total = 0
        }
    }
})

export const {setTokens, addItemToCart} = cartSlice.actions

export default cartSlice