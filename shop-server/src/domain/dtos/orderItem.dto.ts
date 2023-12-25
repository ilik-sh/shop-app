import { IsNumber, IsString, IsUUID, validate } from "class-validator"


export class OrderItemDto {
    @IsNumber()
    quantity: number 

    @IsUUID()
    productId: string

    static from(form?: OrderItemDto) {
        const it = new OrderItemDto
        it.productId = form?.productId
        it.quantity = form?.quantity
        return it 
    }

    static async validate (dto: OrderItemDto) {
        const errors = await validate(dto)
        return errors.length ? errors : false 
    }
}