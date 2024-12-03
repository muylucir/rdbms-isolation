import { 
    EntityManager, 
    ObjectLiteral, 
    EntityTarget, 
    FindOptionsWhere,
    DeepPartial
  } from 'typeorm';
  import { DatabaseService } from '../utils/database.util';
  
  export interface BaseEntity {
    id: number;
  }
  
  export abstract class BaseService<T extends ObjectLiteral & BaseEntity> {
    protected constructor(
      private readonly entityClass: EntityTarget<T>
    ) {}
  
    protected async runInTransaction<R>(
      operation: (manager: EntityManager) => Promise<R>
    ): Promise<R> {
      return DatabaseService.getInstance().runWithinTenant(operation);
    }
  
    async findAll(): Promise<T[]> {
      return this.runInTransaction((manager) => 
        manager.find(this.entityClass)
      );
    }
  
    async findById(id: number): Promise<T | null> {
      return this.runInTransaction((manager) =>
        manager.findOneBy(this.entityClass, {
          id: id
        } as FindOptionsWhere<T>)
      );
    }
  
    async create(data: DeepPartial<T>): Promise<T> {
      return this.runInTransaction(async (manager) => {
        const entity = manager.create(this.entityClass, data);
        return manager.save(entity);
      });
    }
  
    async update(id: number, data: DeepPartial<T>): Promise<T | null> {
      return this.runInTransaction(async (manager) => {
        await manager.update(this.entityClass, id, data);
        return manager.findOneBy(this.entityClass, {
          id: id
        } as FindOptionsWhere<T>);
      });
    }
  
    async delete(id: number): Promise<void> {
      await this.runInTransaction(async (manager) => {
        await manager.delete(this.entityClass, id);
      });
    }
  }