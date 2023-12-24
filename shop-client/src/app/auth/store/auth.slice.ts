import { createSlice } from "@reduxjs/toolkit"


const authSlice = createSlice({
    name: 'auth',
    initialState: {},
    reducers: {
        setTokens: (state, action) => {
            const { accessToken, refreshToken } = action.payload
            localStorage.setItem('refresh', refreshToken)
            sessionStorage.setItem('access', accessToken)
        },
        signOut: (state, action) => {
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
        }
    }
})

export const {setTokens, signOut} = authSlice.actions

export default authSlice
