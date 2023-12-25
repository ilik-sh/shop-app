import { Injectable } from "@nestjs/common";
import { PrismaService } from "prisma/prisma.service";
import { OrderItem, OrderStatus, Order } from "@prisma/client";
import { OrderItemDto } from "domain/dtos/orderItem.dto";


@Injectable()
export class OrderRepository {
    constructor (private readonly prisma: PrismaService) {}

    async createOrder(
        userId: string,
        order: Pick<Order, "status" > &
        {items: Pick<OrderItem, "productId" | "quantity">[]}
    ) {
        return await this.prisma.order.create({
            data: {
                status: order.status,
                items: {
                    createMany: {
                        data: order.items
                    }
                },
                total: 0,
                user: {
                    connect: {
                        id: userId
                    }
                }
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async addItemToOrder(orderId: string, orderItem: OrderItemDto) {
        return await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                items: {
                    create: {
                        productId: orderItem.productId,
                        quantity: orderItem.quantity
                    }
                }
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async updateOrderStatus(orderId: string, status: OrderStatus) {
        return await this.prisma.order.update({
            where: {
                id: orderId
            }, 
            data: {
                status: status
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async updateOrderTotal(orderId: string, total: number) {
        return await this.prisma.order.update({
            where: {
                id: orderId
            },
            data: {
                total: total
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async findOrdersByUserId(userId: string) {
        return await this.prisma.order.findMany({
            where: {
                userId: userId
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async findOrder(orderId: string) {
        return await this.prisma.order.findUnique({
            where: {
                id: orderId
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }

    async findCart(userId: string) {
        return await this.prisma.order.findFirst({
            where: {
                userId: userId,
                status: "InCart"
            },
            include: {
                items: {
                    select: {
                        quantity: true,
                        product: true,
                        id: true
                    }
                }
            }
        })
    }
}