// src/services/product.service.ts
import { Product } from '../entities/Product';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { BaseService } from './base.service';
import { ILike } from 'typeorm';

export class ProductService extends BaseService<Product> {
  constructor() {
    super(Product);
  }

  async search(name: string): Promise<Product[]> {
    return this.runInTransaction((manager) => 
      manager.find(Product, {
        where: { name: ILike(`%${name}%`) }
      })
    );
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    return this.runInTransaction(async (manager) => {
      const product = manager.create(Product, createProductDto);
      return manager.save(product);
    });
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    return this.runInTransaction(async (manager) => {
      const product = await manager.findOneBy(Product, { id });
      if (!product) {
        return null;
      }

      Object.assign(product, updateProductDto);
      return manager.save(product);
    });
  }
}