import { Product } from "app/products/types/product"

export type OrderItem = {
    id: string,
    quantity: number, 
    product: Product,
}
