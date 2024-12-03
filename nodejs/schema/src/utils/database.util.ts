import { DataSource, EntityManager } from 'typeorm';
import { TenantService } from './tenant-context';

export class DatabaseService {
  private static instance: DatabaseService;
  private dataSource: DataSource;

  private constructor(dataSource: DataSource) {
    this.dataSource = dataSource;
  }

  public static initialize(dataSource: DataSource): DatabaseService {
    if (!DatabaseService.instance) {
      DatabaseService.instance = new DatabaseService(dataSource);
    }
    return DatabaseService.instance;
  }

  public static getInstance(): DatabaseService {
    if (!DatabaseService.instance) {
      throw new Error('DatabaseService not initialized');
    }
    return DatabaseService.instance;
  }

  public async runWithinTenant<T>(
    operation: (manager: EntityManager) => Promise<T>
  ): Promise<T> {
    const tenantId = TenantService.getInstance().getTenantId();
    const queryRunner = this.dataSource.createQueryRunner();
    
    await queryRunner.connect();
    await queryRunner.startTransaction();
    
    try {
      await queryRunner.query(`SET search_path TO ${tenantId}`);
      const result = await operation(queryRunner.manager);
      await queryRunner.commitTransaction();
      return result;
    } catch (error) {
      await queryRunner.rollbackTransaction();
      throw error;
    } finally {
      await queryRunner.release();
    }
  }
}