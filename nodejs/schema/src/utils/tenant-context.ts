import { AsyncLocalStorage } from 'async_hooks';

interface TenantContext {
  tenantId: string;
}

export class TenantContextHolder {
  private static asyncLocalStorage = new AsyncLocalStorage<TenantContext>();

  static setTenantId(tenantId: string) {
    const context = this.asyncLocalStorage.getStore();
    if (context) {
      context.tenantId = tenantId;
    } else {
      this.asyncLocalStorage.enterWith({ tenantId });
    }
  }

  static getTenantId(): string {
    const context = this.asyncLocalStorage.getStore();
    if (!context?.tenantId) {
      throw new Error('TenantId not found in context');
    }
    return context.tenantId;
  }

  static runWithTenantId<T>(tenantId: string, fn: () => T | Promise<T>): T | Promise<T> {
    return this.asyncLocalStorage.run({ tenantId }, fn);
  }
}