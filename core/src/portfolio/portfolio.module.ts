import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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
import { PortfolioService } from './portfolio.service.js';
import { PortfolioController } from './portfolio.controller.js';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      HeroProfileEntity,
      AboutMeEntity,
      SkillEntity,
      ProjectEntity,
      ServiceEntity,
      WorkExperienceEntity,
      EducationEntity,
      ContactInfoEntity,
      ContactMessageEntity,
    ]),
  ],
  controllers: [PortfolioController],
  providers: [PortfolioService],
  exports: [PortfolioService],
})
export class PortfolioModule {}

