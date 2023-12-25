import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { baseQueryWithReauth } from './baseQueryWithReauth'
import authSlice, { setTokens } from 'app/auth/store/auth.slice'


export const apiSlice = createApi({
    reducerPath: 'api',
    tagTypes: [],
    baseQuery: baseQueryWithReauth,
    endpoints: () => ({})
})
