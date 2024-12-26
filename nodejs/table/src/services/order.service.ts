import { AppDataSource } from '../data-source';
import { Order, OrderStatus } from '../entities/Order';
import { OrderItem } from '../entities/OrderItem';
import { CreateOrderDto, UpdateOrderStatusDto } from '../dtos/order.dto';
import { ProductService } from './product.service';
import { UserService } from './user.service';
import { TenantAwareService } from './tenant-aware.service';
import { AppError } from '../utils/error.util';

export class OrderService extends TenantAwareService<Order> {
  private productService: ProductService;
  private userService: UserService;

  constructor() {
    super(AppDataSource.getRepository(Order));
    this.productService = new ProductService();
    this.userService = new UserService();
  }

  async findAll(): Promise<Order[]> {
    return this.repository.find(this.addTenantFilter({
      relations: ['user', 'orderItems', 'orderItems.product']
    }));
  }

  async findById(id: number): Promise<Order> {
    const order = await this.repository.findOne(this.addTenantFilter({
      where: { id },
      relations: ['user', 'orderItems', 'orderItems.product']
    }));

    if (!order) {
      throw new AppError(404, 'Order not found');
    }

    return order;
  }

  async findByUserId(userId: number): Promise<Order[]> {
    return this.repository.find(this.addTenantFilter({
      where: { userId },
      relations: ['orderItems', 'orderItems.product']
    }));
  }

  async create(userId: number, createOrderDto: CreateOrderDto): Promise<Order> {
    const user = await this.userService.findById(userId);
    if (!user) {
      throw new AppError(404, 'User not found');
    }

    const order = new Order();
    order.user = user;
    order.userId = userId;
    order.orderDate = new Date();
    order.status = OrderStatus.PENDING;
    order.orderItems = [];
    order.tenantId = this.getTenantId();
    
    let totalAmount = 0;

    for (const itemDto of createOrderDto.orderItems) {
      const product = await this.productService.findById(itemDto.productId);
      if (!product) {
        throw new AppError(404, `Product not found: ${itemDto.productId}`);
      }

      const orderItem = new OrderItem();
      orderItem.product = product;
      orderItem.quantity = itemDto.quantity;
      orderItem.price = product.price;
      orderItem.tenantId = this.getTenantId();

      order.orderItems.push(orderItem);

      totalAmount += product.price * itemDto.quantity;
    }

    order.totalAmount = totalAmount;

    const savedOrder = await this.repository.save(order);
    return this.findById(savedOrder.id);
  }

  async updateStatus(id: number, updateStatusDto: UpdateOrderStatusDto): Promise<Order> {
    const order = await this.findById(id);
    order.status = updateStatusDto.status;
    await this.repository.save(order);
    return this.findById(order.id);
  }
}