import { IsNumber, IsUUID } from "class-validator"
import { OrderItemDto } from "domain/dtos/orderItem.dto"


export class AddOrderItemForm {
    item: OrderItemDto
    
    @IsUUID()
    orderId: string

    static from(form?: AddOrderItemForm) {
        const it = new AddOrderItemForm
        it.item = form?.item
        it.orderId = form?.orderId
        return it 
    }

    static async validate (form: AddOrderItemForm) {
        const errors = await this.validate(form)
        return errors.length ? errors : false 
    }
}