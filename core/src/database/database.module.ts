import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import {
  HeroProfileEntity,
  AboutMeEntity,
  SkillEntity,
  ProjectEntity,
  ServiceEntity,
  WorkExperienceEntity,
  EducationEntity,
  ContactInfoEntity,
  ContactMessageEntity,
} from '../entities/index.js';
import { SeedService } from './seed.service.js';

export const allEntities = [
  HeroProfileEntity,
  AboutMeEntity,
  SkillEntity,
  ProjectEntity,
  ServiceEntity,
  WorkExperienceEntity,
  EducationEntity,
  ContactInfoEntity,
  ContactMessageEntity,
];

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        const databaseUrl = config.get<string>('DATABASE_URL');
        const isProduction = config.get<string>('NODE_ENV') === 'production';
        const syncEnabled = config.get<string>('DB_SYNC', 'true') === 'true';

        if (databaseUrl) {
          return {
            type: 'postgres' as const,
            url: databaseUrl,
            entities: allEntities,
            synchronize: syncEnabled,
            ssl: config.get<string>('DB_SSL') === 'true'
              ? { rejectUnauthorized: false }
              : false,
          };
        }

        return {
          type: 'postgres' as const,
          host: config.get<string>('DB_HOST', 'localhost'),
          port: config.get<number>('DB_PORT', 5432),
          username: config.get<string>('DB_USERNAME', 'postgres'),
          password: config.get<string>('DB_PASSWORD', 'postgres'),
          database: config.get<string>('DB_NAME', 'portfolio_db'),
          entities: allEntities,
          synchronize: syncEnabled,
          ssl: config.get<string>('DB_SSL') === 'true'
            ? { rejectUnauthorized: false }
            : false,
        };
      },
    }),
    TypeOrmModule.forFeature(allEntities),
  ],
  providers: [SeedService],
  exports: [TypeOrmModule, SeedService],
})
export class DatabaseModule {}

