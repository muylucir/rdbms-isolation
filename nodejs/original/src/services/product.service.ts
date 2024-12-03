import { Repository, ILike } from 'typeorm';
import { AppDataSource } from '../data-source';
import { Product } from '../entities/Product';
import { CreateProductDto, UpdateProductDto } from '../dtos/product.dto';

export class ProductService {
  private productRepository: Repository<Product>;

  constructor() {
    this.productRepository = AppDataSource.getRepository(Product);
  }

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async findById(id: number): Promise<Product | null> {
    return this.productRepository.findOneBy({ id });
  }

  async search(name: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { name: ILike(`%${name}%`) }
    });
  }

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepository.create(createProductDto);
    return this.productRepository.save(product);
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product | null> {
    const product = await this.productRepository.findOneBy({ id });
    if (!product) return null;

    Object.assign(product, updateProductDto);
    return this.productRepository.save(product);
  }

  async delete(id: number): Promise<void> {
    await this.productRepository.delete(id);
  }
}