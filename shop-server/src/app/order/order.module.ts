import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { OrderRepository } from 'domain/repositories/order.repository';
import { OrderItemRepository } from 'domain/repositories/orderItem.repository';
import { ProductRepository } from 'domain/repositories/product.repository';

@Module({
  imports: [PrismaModule],
  controllers: [OrderController],
  providers: [
    OrderService,
    OrderRepository,
    OrderItemRepository,
    ProductRepository
  ],
})
export class OrderModule {}
