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
                product: true
                
            }
        })
    }


    async addItemToOrder(orderId: string, orderItem: OrderItemDto) {
        return await this.prisma.orderItem.create({
            data: {
                quantity: orderItem.quantity,
                order: {
                    connect: {
                        id: orderId
                    }
                },
                product: {
                    connect: {
                        id: orderItem.productId
                    }
                }
            },
            include: {
                product: true
            }
        })
    }

    async findForOrder(orderId: string) {
        return await this.prisma.orderItem.findMany({
            where: {
                orderId: orderId
            },
            include: {
                product: true
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
            },
            include: {
                product: true
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