// src/data-source.ts
import { DataSource } from 'typeorm';
import { dbConfig } from './config/config';
import { DatabaseService } from './utils/database.util';

export const AppDataSource = new DataSource({
  ...dbConfig,
  extra: {
    poolSize: 50, // 모든 테넌트가 공유할 커넥션 풀 크기
  }
});

// Initialize DatabaseService with AppDataSource
DatabaseService.initialize(AppDataSource);