import { configureStore } from "@reduxjs/toolkit"
import { setupListeners } from "@reduxjs/toolkit/query"
import { apiSlice } from "api/apiSlice"
import authSlice from "app/auth/store/auth.slice"
import cartSlice from "app/cart /store/cart.slice"
import userSlice from "app/user/store/user.slice"
import { useDispatch, useSelector, TypedUseSelectorHook } from "react-redux"


const store = configureStore({
    reducer: {
        [apiSlice.reducerPath]: apiSlice.reducer,
        auth: authSlice.reducer,
        user: userSlice.reducer,
        cart: cartSlice.reducer
    },
    devTools: true,
    middleware: buildGetDefaultMiddleware =>
     buildGetDefaultMiddleware().concat(apiSlice.middleware),
})

setupListeners(store.dispatch)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
export const useAppDispatch: () => AppDispatch = useDispatch

export default store
