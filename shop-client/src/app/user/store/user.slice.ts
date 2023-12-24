import { createSlice } from "@reduxjs/toolkit"
import { access } from "fs"

const initialState = {
    isUser: false
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setUser: (state) => {
            state.isUser = true
        },
        removeUser: (state) => {
            state.isUser = false
        }
    }
})

export const {setUser} = userSlice.actions

export default userSlice
