import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { BaseService } from './tenant-aware.service';

export class UserService extends BaseService<User> {
  constructor() {
    super(AppDataSource.getRepository(User));
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.repository.findOne({ where: { id } });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.repository.findOne({
      where: { email: createUserDto.email }
    });

    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = this.repository.create(createUserDto);
    return this.repository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.findById(id);
    if (!user) return null;

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.repository.findOne({
        where: { email: updateUserDto.email }
      });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.repository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.repository.delete({ id });
  }
}