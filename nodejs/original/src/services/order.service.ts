import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Order, OrderStatus } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { ProductService } from './product.service';
import { UserService } from './user.service';

export class OrderService {
  private orderRepository: Repository<Order>;
  private orderItemRepository: Repository<OrderItem>;
  private productService: ProductService;
  private userService: UserService;

  constructor() {
    this.orderRepository = AppDataSource.getRepository(Order);
    this.orderItemRepository = AppDataSource.getRepository(OrderItem);
    this.productService = new ProductService();
    this.userService = new UserService();
  }

  async findAll(): Promise<Order[]> {
    return this.orderRepository.find({
      relations: ['user', 'orderItems', 'orderItems.product']
    });
  }

  async findById(id: number): Promise<Order | null> {
    return this.orderRepository.findOne({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product']
    });
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.orderRepository.find({
      where: { userId },
      relations: ['orderItems', 'orderItems.product']
    });
  }

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findById(userId);
    if (!user) throw new Error('User not found');

    const order = new Order();
    order.user = user;
    order.userId = userId;
    order.orderDate = new Date();
    order.status = OrderStatus.PENDING;
    order.orderItems = [];
    
    let totalAmount = 0;

    for (const itemDto of createOrderDto.orderItems) {
      const product = await this.productService.findById(itemDto.productId);
      if (!product) throw new Error(`Product not found: ${itemDto.productId}`);

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemDto.quantity;
      orderItem.price = product.price;
      order.orderItems.push(orderItem);

      totalAmount += product.price * itemDto.quantity;
    }

    order.totalAmount = totalAmount;
    return this.orderRepository.save(order);
  }

  async updateStatus(id: number, updateStatusDto: UpdateOrderStatusDto): Promise<Order | null> {
    const order = await this.orderRepository.findOneBy({ id });
    if (!order) return null;

    order.status = updateStatusDto.status;
    return this.orderRepository.save(order);
  }
}