import { DataSource } from 'typeorm';
import { dbConfig } from './config/config';

export const AppDataSource = new DataSource(dbConfig);