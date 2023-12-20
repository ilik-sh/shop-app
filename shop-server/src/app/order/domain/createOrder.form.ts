import { IsOptional, IsNumber, IsEnum, validate } from "class-validator";
import { OrderStatus } from "@prisma/client";
import { OrderItemDto } from "domain/dtos/orderItem.dto";

export class CreateOrderForm {
    items: OrderItemDto[]

    @IsEnum(OrderStatus)
    status: OrderStatus

    static from(dto?: CreateOrderForm) {
        const it = new CreateOrderForm();
        it.items = dto?.items
        it.status = dto?.status
        return it;
      }

    static async validate(dto: CreateOrderForm) {
        const errors = await validate(dto);
        return errors.length ? errors : false;
      }
}