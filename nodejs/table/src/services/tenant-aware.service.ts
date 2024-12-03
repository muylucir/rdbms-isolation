import { Repository, ObjectLiteral } from 'typeorm';
import { TenantContextHolder } from '../utils/tenant-context';

export abstract class TenantAwareService<T extends ObjectLiteral> {
  protected constructor(protected repository: Repository<T>) {}

  protected getTenantId(): string {
    return TenantContextHolder.getTenantId();
  }

  protected addTenantFilter(queryOptions: any = {}): any {
    const tenantId = this.getTenantId();
    return {
      ...queryOptions,
      where: {
        ...queryOptions.where,
        tenantId
      }
    };
  }
}