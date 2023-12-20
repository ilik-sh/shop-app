import { IsNumber, IsString } from "class-validator"


export class OrderItemDto {
    @IsNumber()
    quantity: number 

    @IsString()
    productId: string
}