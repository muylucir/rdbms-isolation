import { Column, BeforeInsert, BeforeUpdate, ObjectLiteral } from 'typeorm';
import { TenantContextHolder } from '../utils/tenant-context';

export abstract class TenantBaseEntity implements ObjectLiteral {
  @Column({ name: 'tenant_id', nullable: false })
  tenantId: string;

  @BeforeInsert()
  @BeforeUpdate()
  setTenantId() {
    this.tenantId = TenantContextHolder.getTenantId();
  }
}