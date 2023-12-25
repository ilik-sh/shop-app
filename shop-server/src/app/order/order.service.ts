import { Injectable } from '@nestjs/common';
import { OrderDto } from 'domain/dtos/order.dto';
import { OrderRepository } from 'domain/repositories/order.repository';
import { OrderItemRepository } from 'domain/repositories/orderItem.repository';
import { OrderUpdateForm } from './domain/orderUpdate.form';
import { OrderItemUpdateForm } from './domain/orderItemUpdate.form';
import { Order, OrderItem, User } from '@prisma/client';
import { ProductRepository } from 'domain/repositories/product.repository';
import { ApiInternalException } from 'exceptions/apiInternalException';
import { OrderItemDto } from 'domain/dtos/orderItem.dto';
import { reduce } from 'rxjs';

@Injectable()
export class OrderService {
    constructor (
        private readonly orderRepository: OrderRepository,
        private readonly orderItemRepository: OrderItemRepository,
        private readonly productRepository: ProductRepository
        ) {}

    async createOrder(
        userId: string,
        order: Pick<Order, "status"> &
        {items: Pick<OrderItem, "productId" | "quantity">[]}) {
            await this.reduceProductStock(order.items)
            return await this.orderRepository.createOrder(userId, order)
    }

    async addItemToOrder(orderId: string, item: OrderItemDto) {
        return await this.orderItemRepository.addItemToOrder(orderId, item)
    }

    async deleteItemFromOrder(orderItemId: string) {
        return await this.orderItemRepository.deleteOrderItem(orderItemId)
    }

    async getOrderItem(orderItemId: string) {
        return await this.orderItemRepository.findById(orderItemId)
    }

    async getProduct(productId: string) {
        return await this.productRepository.findById(productId)
    }

    async updateOrderStatus(order: Pick<Order, "id" | "status">) {
        return await this.orderRepository.updateOrderStatus(order.id, order.status)
    }

    async updateOrderItemQuantity(orderItem: Pick<OrderItem, "id" | "quantity">) {
        return await this.orderItemRepository.updateOrderItemQuantity(orderItem.id, orderItem.quantity)
    }

    async getOrder(orderId: string) {
        return await this.orderRepository.findOrder(orderId)
    }

    async reduceProductStock(items: OrderItemDto[]) {
        items.map(async (item) => {
            await this.productRepository.reduceStock(item.productId, item.quantity)
        })
    }

    async getHistory(userId: string) {
        return await this.orderRepository.findOrdersByUserId(userId)
    }

    async getCart(userId: string) {
        return await this.orderRepository.findCart(userId)
    }

    async updateTotal (orderId: string) {
        const items = await this.orderItemRepository.findForOrder(orderId)
        const newTotal = items.reduce((total, currentItem) => {
            return total + (currentItem.quantity * currentItem.product.price)
        }, 0)
        return await this.orderRepository.updateOrderTotal(orderId, newTotal)
    }

    async validateOrderItems(items: OrderItemDto[]) {
        const insufficient = []
        await Promise.all(items.map(async (item) => {
            const product = await this.productRepository.findById(item.productId)
            if (item.quantity > product.stock) {
                insufficient.push(product.name)
            }
        }))
        return insufficient.length ? insufficient : false
    }
}
