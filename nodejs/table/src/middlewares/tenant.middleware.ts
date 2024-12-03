import { Request, Response, NextFunction } from 'express';
import { TenantContextHolder } from '../utils/tenant-context';
import { AppError } from '../utils/error.util';

export const tenantMiddleware = (
  req: Request, 
  res: Response, 
  next: NextFunction
) => {
  try {
    const tenantId = req.headers['x-tenant-id'] as string;
    
    if (!tenantId) {
      throw new AppError(400, 'Tenant ID is required');
    }

    return TenantContextHolder.runWithTenantId(tenantId, () => next());
  } catch (error) {
    next(error);
  }
};