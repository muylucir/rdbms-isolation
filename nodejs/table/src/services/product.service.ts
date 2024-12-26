import { ILike } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';
import { TenantAwareService } from './tenant-aware.service';

export class ProductService extends TenantAwareService<Product> {
  constructor() {
    super(AppDataSource.getRepository(Product));
  }

  async findAll(): Promise<Product[]> {
    return this.repository.find(this.addTenantFilter());
  }

  async findById(id: number): Promise<Product | null> {
    return this.repository.findOne(this.addTenantFilter({ where: { id } }));
  }

  async search(name: string): Promise<Product[]> {
    return this.repository.find(
      this.addTenantFilter({ 
        where: { name: ILike(`%${name}%`) }
      })
    );
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.repository.create({
      ...createProductDto,
      tenantId: this.getTenantId()
    });
    return this.repository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.findById(id);
    if (!product) return null;

    Object.assign(product, updateProductDto);
    return this.repository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete(this.addTenantFilter({ where: { id } }));
  }
}