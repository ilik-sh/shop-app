import { BaseQueryFn, FetchArgs, FetchBaseQueryError, fetchBaseQuery } from "@reduxjs/toolkit/query"
import { GetState } from "@reduxjs/toolkit"
import { RootState } from "store"
import { setTokens, signOut } from "app/auth/store/auth.slice"
import { setUser } from "app/user/store/user.slice"

const baseQuery = fetchBaseQuery({ 
    baseUrl: 'http://localhost:3000',
    prepareHeaders: (headers: Headers, {getState}) => {
        const state = getState() as RootState

        const token = sessionStorage.getItem('access')
        if (token) {
            headers.set('Authorization', `Bearer ${token}`)
        }
        return headers

    }
 })

 const baseRefreshQuery = fetchBaseQuery({ 
  baseUrl: 'http://localhost:3000',
  prepareHeaders: (headers: Headers, {getState}) => {
      const state = getState() as RootState

      const token = localStorage.getItem('refresh')
      if (token) {
          headers.set('Authorization', `Bearer ${token}`)
      }
      return headers

  }
})

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await baseQuery(args, api, extraOptions)
  if (result.error && result.error.status === 401) {
    // try to get a new token
    const refreshResult = await baseRefreshQuery('auth/refresh', api, extraOptions)
    if (refreshResult.data) {
      // store the new token
      api.dispatch(setTokens(refreshResult.data))
      api.dispatch(setUser())
      // retry the initial query
      result = await baseQuery(args, api, extraOptions)
    } else {
      api.dispatch(signOut)
    }
  }
  return result
}