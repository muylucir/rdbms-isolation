import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { dbConfig } from './config/config';

export const AppDataSource = new DataSource({
  ...dbConfig,
  namingStrategy: new SnakeNamingStrategy()
});

DatabaseService.initialize(AppDataSource);