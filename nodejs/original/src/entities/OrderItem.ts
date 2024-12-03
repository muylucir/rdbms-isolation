import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Order } from './Order';
import { Product } from './Product';
import { Min } from 'class-validator';

@Entity('order_items')
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Order, order => order.orderItems)
  @JoinColumn({ name: 'order_id' })
  order: Order;

  @ManyToOne(() => Product, product => product.orderItems)
  @JoinColumn({ name: 'product_id' })
  product: Product;

  @Column()
  @Min(1)
  quantity: number;

  @Column('decimal', { precision: 10, scale: 2 })
  price: number;
}