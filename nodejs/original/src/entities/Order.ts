import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Entity('orders')
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, user => user.orders)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  userId: number;

  @Column('timestamp')
  orderDate: Date;

  @Column('decimal', { precision: 10, scale: 2 })
  totalAmount: number;

  @Column('enum', { enum: OrderStatus })
  status: OrderStatus;

  @OneToMany(() => OrderItem, orderItem => orderItem.order, { cascade: true })
  orderItems: OrderItem[];
}