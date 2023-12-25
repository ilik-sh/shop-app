import { Body, Controller, HttpCode, Post, UseGuards, Patch, Get, Delete } from '@nestjs/common';
import { OrderService } from './order.service';
import { CurrentUser } from 'decorators/currentUser.decorator';
import { ApiRequestException } from 'exceptions/apiRequestException';
import { ErrorCodes } from 'enums/errorCode.enum';
import { AccessTokenGuard } from 'security/guards/accessToken.guard';
import { OrderItem, User } from '@prisma/client';
import { OrderUpdateForm } from './domain/orderUpdate.form';
import { OrderItemUpdateForm } from './domain/orderItemUpdate.form';
import { CreateOrderForm } from './domain/createOrder.form';
import { ApiInternalException } from 'exceptions/apiInternalException';
import { OrderItemDto } from 'domain/dtos/orderItem.dto';

@UseGuards(AccessTokenGuard)
@Controller('/order')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post()
  @HttpCode(200)
  async create(@CurrentUser() user: User, @Body() body: CreateOrderForm) {
    const form = CreateOrderForm.from(body)
    const errors = await CreateOrderForm.validate(form)

    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidRequest, errors)
    }

    const insufficient = await this.orderService.validateOrderItems(form.items)
    if (insufficient) {
      throw new ApiInternalException(ErrorCodes.InsufficientProduct)
    }

    const order = await this.orderService.createOrder(user.id, form)
    if (!order) {
      throw new ApiInternalException(ErrorCodes.OrderCreationFailed)
    }

    const updatedOrder = await this.orderService.updateTotal(order.id)

    return updatedOrder
  }

  @Patch('/itemQuantity')
  @HttpCode(200)
  async updateOrderItemQuantity(@Body() body: OrderItemUpdateForm) {
    const form = OrderItemUpdateForm.from(body)
    const errors = await OrderItemUpdateForm.validate(form) 
    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidForm, errors)
    }

    const orderItem = await this.orderService.getOrderItem(form.id)
    if (!orderItem) {
      throw new ApiInternalException(ErrorCodes.OrderItemDoesNotExist)
    }

    const updatedItem = await this.orderService.updateOrderItemQuantity(form)
    await this.orderService.updateTotal(orderItem.orderId)
    
    return updatedItem
  }

  @Patch('/status')
  @HttpCode(200)
  async updateOrderStatus(@Body() body: OrderUpdateForm) {
    const form = OrderUpdateForm.from(body)
    const errors = await OrderUpdateForm.validate(form) 
    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidForm, errors)
    }

    const order = this.orderService.getOrder(form.id)
    if (!order) {
      throw new ApiInternalException(ErrorCodes.OrderDoesNotExist)
    }

    return await this.orderService.updateOrderStatus(form)
  }

  @Patch('/addItem') 
  @HttpCode(200)
  async addItemToOrder(@CurrentUser() user: User, @Body() body: OrderItemDto) {
    const dto = OrderItemDto.from(body)
    const errors = await OrderItemDto.validate(dto) 
    if (errors) {
      throw new ApiRequestException(ErrorCodes.InvalidForm, errors)
    }

    const product = this.orderService.getProduct(dto.productId)
    if (!product) {
      throw new ApiInternalException(ErrorCodes.ProductDoesNotExist)
    }

    const insufficient = await this.orderService.validateOrderItems([dto])
    if (insufficient) {
      throw new ApiInternalException(ErrorCodes.InsufficientProduct)
    }

    const cart = await this.orderService.getCart(user.id)
    if (!cart) {
      throw new ApiInternalException(ErrorCodes.OrderDoesNotExist)
    }
 
    const order = await this.orderService.addItemToOrder(cart.id, dto)
    if (!order) {
      throw new ApiInternalException(ErrorCodes.OrderCreationFailed)
    }

    const updatedOrder = await this.orderService.updateTotal(cart.id)
    return order
  }

  @Delete('/item')
  @HttpCode(200)
  async removeItemFromOrder(orderItemId: string) {
    return await this.orderService.deleteItemFromOrder(orderItemId)
  }


  @Get('/history')
  @HttpCode(200)
  async getOrderHistory(@CurrentUser() user: User) {
    return await this.orderService.getHistory(user.id)
  } 

  @Get('/cart')
  @HttpCode(200)
  async getCart(@CurrentUser() user: User) {
    return await this.orderService.getCart(user.id)
  }


}
