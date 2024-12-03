import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { OrderItem } from './OrderItem';
import { Length, Min } from 'class-validator';
import { TenantBaseEntity } from './base.entity';

@Entity('products')
export class Product extends TenantBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 100)
  name: string;

  @Column({ nullable: true })
  @Length(0, 500)
  description: string;

  @Column('decimal', { precision: 10, scale: 2 })
  @Min(0)
  price: number;

  @OneToMany(() => OrderItem, orderItem => orderItem.product)
  orderItems: OrderItem[];
}