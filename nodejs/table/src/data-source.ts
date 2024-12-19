import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { dbConfig } from './config/config';
import { TenantEntitySubscriber } from './subscribers/tenant.subscriber';

export const AppDataSource = new DataSource({
  ...dbConfig,
  namingStrategy: new SnakeNamingStrategy(),
  subscribers: [TenantEntitySubscriber]
});