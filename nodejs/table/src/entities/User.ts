import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Order } from './Order';
import { IsEmail, Length } from 'class-validator';
import { TenantBaseEntity } from './base.entity';

@Entity('users')
export class User extends TenantBaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @Length(3, 50)
  username: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  password: string;

  @OneToMany(() => Order, order => order.user)
  orders: Order[];
}