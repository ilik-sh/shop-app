import { OrderStatus } from "@prisma/client"
import { IsEnum, IsNumber, IsOptional, IsUUID } from "class-validator"


export class OrderUpdateForm {
    @IsUUID()
    id: string

    @IsEnum(OrderStatus)
    status: OrderStatus


    static from(form?: OrderUpdateForm) {
        const it = new OrderUpdateForm
        it.status = form?.status
        it.id = form?.id
        return it 
    }

    static async validate (form: OrderUpdateForm) {
        const errors = await this.validate(form)
        return errors.length ? errors : false 
    }
}