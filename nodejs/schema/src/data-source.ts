import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { dbConfig } from './config/config';
import { DatabaseService } from './utils/database.util';

export const AppDataSource = new DataSource({
  ...dbConfig,
  namingStrategy: new SnakeNamingStrategy()
});

DatabaseService.initialize(AppDataSource);