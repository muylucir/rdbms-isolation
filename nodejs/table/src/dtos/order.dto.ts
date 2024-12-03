import { IsArray, IsEnum, ValidateNested, IsNumber, Min } from 'class-validator';
import { Type } from 'class-transformer';
import { OrderStatus } from '../entities/Order';

export class OrderItemDto {
  @IsNumber()
  productId: number;

  @IsNumber()
  @Min(1)
  quantity: number;
}

export class CreateOrderDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemDto)
  orderItems: OrderItemDto[];
}

export class UpdateOrderStatusDto {
  @IsEnum(OrderStatus)
  status: OrderStatus;
}