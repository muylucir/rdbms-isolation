import { Repository } from 'typeorm';
import { AppDataSource } from '../data-source';
import { User } from '../entities/User';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';

export class UserService {
  private userRepository: Repository<User>;

  constructor() {
    this.userRepository = AppDataSource.getRepository(User);
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findById(id: number): Promise<User | null> {
    return this.userRepository.findOneBy({ id });
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOneBy({ email: createUserDto.email });
    if (existingUser) {
      throw new Error('Email already exists');
    }

    const user = this.userRepository.create(createUserDto);
    return this.userRepository.save(user);
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) return null;

    if (updateUserDto.email && updateUserDto.email !== user.email) {
      const existingUser = await this.userRepository.findOneBy({ email: updateUserDto.email });
      if (existingUser) {
        throw new Error('Email already exists');
      }
    }

    Object.assign(user, updateUserDto);
    return this.userRepository.save(user);
  }

  async delete(id: number): Promise<void> {
    await this.userRepository.delete(id);
  }
}