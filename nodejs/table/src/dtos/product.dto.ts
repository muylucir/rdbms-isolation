import { IsString, Length, IsNumber, Min, IsOptional } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @Length(3, 100)
  name: string;

  @IsOptional()
  @IsString()
  @Length(0, 500)
  description?: string;

  @IsNumber()
  @Min(0)
  price: number;

  @IsNumber()
  @Min(0)
  stockQuantity: number;
}

export class UpdateProductDto extends CreateProductDto {}