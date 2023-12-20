import { OrderItem, OrderStatus } from "@prisma/client";
import { IsEnum, IsNumber, IsOptional, validate } from "class-validator";
import { OrderItemDto } from "./orderItem.dto";


export class OrderDto {
    items: OrderItemDto[]

    @IsNumber()
    @IsOptional()
    total: number

    @IsEnum(OrderStatus)
    status: OrderStatus

    static from(dto?: OrderDto) {
        const it = new OrderDto();
        it.items = dto?.items
        it.status = dto?.status
        it.total = dto?.total
        return it;
      }

    static async validate(dto: OrderDto) {
        const errors = await validate(dto);
        return errors.length ? errors : false;
      }
}