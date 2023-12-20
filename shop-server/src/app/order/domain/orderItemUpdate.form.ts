import { OrderStatus } from "@prisma/client"
import { IsNumber, IsUUID } from "class-validator"


export class OrderItemUpdateForm {
    @IsUUID()
    id: string

    @IsNumber()
    quantity: number


    static from(form?: OrderItemUpdateForm) {
        const it = new OrderItemUpdateForm
        it.id = form?.id
        it.quantity = form?.quantity
        return it 
    }

    static async validate (form: OrderItemUpdateForm) {
        const errors = await this.validate(form)
        return errors.length ? errors : false 
    }
}