import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { User } from './User';
import { OrderItem } from './OrderItem';
import { TenantBaseEntity } from './base.entity';

export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED'
}

@Entity('orders')
export class Order extends TenantBaseEntity {
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

  @OneToMany(() => OrderItem, orderItem => orderItem.order, {
    cascade: true,           // 저장/삭제 시 자동으로 orderItems도 처리
    eager: false,            // 필요할 때만 로딩
    orphanedRowAction: 'delete'  // 연결이 끊어진 orderItems 자동 삭제
  })
  orderItems: OrderItem[];
}