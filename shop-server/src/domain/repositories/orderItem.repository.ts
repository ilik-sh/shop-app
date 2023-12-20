import { Injectable } from "@nestjs/common";
import { OrderItemDto } from "domain/dtos/orderItem.dto";
import { PrismaService } from "prisma/prisma.service";


@Injectable()
export class OrderItemRepository {
    constructor (private readonly prisma: PrismaService) {}

    async findById(orderItemId: string) {
        return await this.prisma.orderItem.findFirst({
            where: {
                id: orderItemId
            },
            include: {
                product: {
                    select: {
                        price: true
                    }
                }
                
            }
        })
    }

    async findForOrder(orderId: string) {
        return await this.prisma.orderItem.findMany({
            where: {
                orderId: orderId
            },
            include: {
                product: {
                    select: {
                        price: true
                    }
                }
            }
        })
    }

    async updateOrderItemQuantity(orderItemId: string, quantity: number) {
        return await this.prisma.orderItem.update({
            where: {
                id: orderItemId
            },
            data: {
                quantity: quantity,
            }
        })
    }

    async deleteOrderItem(orderItemId: string) {
        return await this.prisma.orderItem.delete({
            where: {
                id: orderItemId
            }
        })
    }
}