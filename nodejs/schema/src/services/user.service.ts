// src/services/user.service.ts
import { User } from '../entities/User';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { BaseService } from './base.service';
import { AppError } from '../utils/error.util';
import { FindOptionsWhere, FindOneOptions } from 'typeorm';

export class UserService extends BaseService<User> {
  constructor() {
    super(User);
  }

  // Override base create method to prevent direct usage
  async create(data: any): Promise<User> {
    throw new Error('Use createUser method instead');
  }

  async findAll(): Promise<User[]> {
    return this.runInTransaction((manager) =>
      manager.find(User, {
        select: ['id', 'username', 'email'] // password 제외
      })
    );
  }

  async findById(id: number): Promise<User | null> {
    return this.runInTransaction((manager) =>
      manager.findOne(User, {
        where: { id } as FindOptionsWhere<User>,
        select: ['id', 'username', 'email'] // password 제외
      } as FindOneOptions<User>)
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.runInTransaction((manager) =>
      manager.findOne(User, {
        where: { email } as FindOptionsWhere<User>
      } as FindOneOptions<User>)
    );
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    return this.runInTransaction(async (manager) => {
      const existingUser = await manager.findOne(User, {
        where: { email: createUserDto.email } as FindOptionsWhere<User>
      });

      if (existingUser) {
        throw new AppError(400, 'Email already exists');
      }

      const user = manager.create(User, {
        ...createUserDto,
        // 여기에서 비밀번호 해싱 등의 추가 로직을 구현할 수 있습니다.
      });

      const savedUser = await manager.save(user);
      
      // password를 제외한 사용자 정보 반환
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as User;
    });
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
    return this.runInTransaction(async (manager) => {
      const user = await manager.findOne(User, {
        where: { id } as FindOptionsWhere<User>
      });
      
      if (!user) {
        return null;
      }

      if (updateUserDto.email && updateUserDto.email !== user.email) {
        const existingUser = await manager.findOne(User, {
          where: { email: updateUserDto.email } as FindOptionsWhere<User>
        });
        if (existingUser) {
          throw new AppError(400, 'Email already exists');
        }
      }

      // 업데이트할 필드만 선택적으로 업데이트
      if (updateUserDto.username) user.username = updateUserDto.username;
      if (updateUserDto.email) user.email = updateUserDto.email;
      if (updateUserDto.password) {
        // 여기에서 비밀번호 해싱 등의 추가 로직을 구현할 수 있습니다.
        user.password = updateUserDto.password;
      }

      const savedUser = await manager.save(user);
      
      // password를 제외한 사용자 정보 반환
      const { password, ...userWithoutPassword } = savedUser;
      return userWithoutPassword as User;
    });
  }
}