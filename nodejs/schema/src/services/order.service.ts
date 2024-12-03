import { Order, OrderStatus } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { BaseService } from './base.service';
import { AppError } from '../utils/error.util';
import { User } from '../entities/User';
import { Product } from '../entities/Product';
import { FindOptionsWhere, FindOneOptions } from 'typeorm';

export class OrderService extends BaseService<Order> {
  constructor() {
    super(Order);
  }

  // Override the base class method to prevent direct usage
  async create(data: any): Promise<Order> {
    throw new Error('Use createOrder method instead');
  }

  async findAll(): Promise<Order[]> {
    return this.runInTransaction((manager) =>
      manager.find(Order, {
        relations: ['user', 'orderItems', 'orderItems.product']
      })
    );
  }

  async findById(id: number): Promise<Order | null> {
    return this.runInTransaction((manager) =>
      manager.findOne(Order, {
        where: { id },
        relations: ['user', 'orderItems', 'orderItems.product']
      } as FindOneOptions<Order>)
    );
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.runInTransaction((manager) =>
      manager.find(Order, {
        where: { userId } as FindOptionsWhere<Order>,
        relations: ['orderItems', 'orderItems.product']
      })
    );
  }

  async createOrder(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      // 사용자 확인
      const user = await manager.findOne(User, {
        where: { id: userId } as FindOptionsWhere<User>
      });

      if (!user) {
        throw new AppError(404, 'User not found');
      }

      // 새로운 주문 생성
      const order = manager.create(Order, {
        user,
        userId,
        orderDate: new Date(),
        status: OrderStatus.PENDING,
        orderItems: []
      });

      // 주문 항목 처리
      let totalAmount = 0;

      for (const itemDto of createOrderDto.orderItems) {
        // 상품 확인
        const product = await manager.findOne(Product, {
          where: { id: itemDto.productId } as FindOptionsWhere<Product>
        });

        if (!product) {
          throw new AppError(404, `Product not found: ${itemDto.productId}`);
        }

        // 주문 항목 생성
        const orderItem = manager.create(OrderItem, {
          product,
          quantity: itemDto.quantity,
          price: product.price
        });

        order.orderItems.push(orderItem);
        totalAmount += Number(product.price) * itemDto.quantity;
      }

      order.totalAmount = totalAmount;

      // 주문 저장
      return manager.save(order);
    });
  }

  async updateStatus(id: number, updateStatusDto: UpdateOrderStatusDto): Promise<Order | null> {
    return this.runInTransaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id },
        relations: ['user', 'orderItems', 'orderItems.product']
      } as FindOneOptions<Order>);

      if (!order) {
        return null;
      }

      order.status = updateStatusDto.status;
      return manager.save(order);
    });
  }

  async cancelOrder(id: number): Promise<Order> {
    return this.runInTransaction(async (manager) => {
      const order = await manager.findOne(Order, {
        where: { id },
        relations: ['orderItems']
      } as FindOneOptions<Order>);

      if (!order) {
        throw new AppError(404, 'Order not found');
      }

      if (order.status === OrderStatus.COMPLETED) {
        throw new AppError(400, 'Cannot cancel completed order');
      }

      order.status = OrderStatus.CANCELLED;
      return manager.save(order);
    });
  }

  async getUserOrderStats(userId: number): Promise<{
    totalOrders: number;
    totalAmount: number;
    averageOrderAmount: number;
  }> {
    return this.runInTransaction(async (manager) => {
      const orders = await manager.find(Order, {
        where: { 
          userId,
          status: OrderStatus.COMPLETED
        } as FindOptionsWhere<Order>
      });

      const totalAmount = orders.reduce((sum, order) => sum + Number(order.totalAmount), 0);
      
      return {
        totalOrders: orders.length,
        totalAmount,
        averageOrderAmount: orders.length > 0 ? totalAmount / orders.length : 0
      };
    });
  }
}