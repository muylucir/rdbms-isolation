import dotenv from 'dotenv';
import { DataSourceOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

dotenv.config();

export const dbConfig: DataSourceOptions = {
  type: 'postgres',
  host: '<Replace with your PostgreSQL database endpoint>',
  port: 5432,
  username: '<Replace with your PostgreSQL database credentials>',
  password: '<Replace with your PostgreSQL database credentials>',
  database: 'multitenantdb',
  entities: ['src/entities/**/*.ts'],
  synchronize: false,
  logging: false,
  namingStrategy: new SnakeNamingStrategy()
};