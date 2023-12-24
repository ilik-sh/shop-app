import { apiSlice } from "api/apiSlice"
import { Product } from "../types/product"

const productsApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        getProducts: builder.query<Product[], void>({
            query: () => ({
                url: 'product',
            })
        })
    })
})

export const {useGetProductsQuery} = productsApiSlice