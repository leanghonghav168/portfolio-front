import { Injectable, Logger, OnApplicationBootstrap } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import {
  HeroProfileEntity,
  AboutMeEntity,
  SkillEntity,
  ProjectEntity,
  ServiceEntity,
  WorkExperienceEntity,
  EducationEntity,
  ContactInfoEntity,
} from '../entities/index.js';
import {
  initialHeroProfile,
  initialAboutMe,
  initialSkills,
  initialProjects,
  initialServices,
  initialWorkExperiences,
  initialEducations,
  initialContactInfo,
} from './seed.data.js';

@Injectable()
export class SeedService implements OnApplicationBootstrap {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(HeroProfileEntity)
    private readonly heroRepo: Repository<HeroProfileEntity>,
    @InjectRepository(AboutMeEntity)
    private readonly aboutRepo: Repository<AboutMeEntity>,
    @InjectRepository(SkillEntity)
    private readonly skillRepo: Repository<SkillEntity>,
    @InjectRepository(ProjectEntity)
    private readonly projectRepo: Repository<ProjectEntity>,
    @InjectRepository(ServiceEntity)
    private readonly serviceRepo: Repository<ServiceEntity>,
    @InjectRepository(WorkExperienceEntity)
    private readonly workRepo: Repository<WorkExperienceEntity>,
    @InjectRepository(EducationEntity)
    private readonly eduRepo: Repository<EducationEntity>,
    @InjectRepository(ContactInfoEntity)
    private readonly contactRepo: Repository<ContactInfoEntity>,
  ) {}

  async onApplicationBootstrap(): Promise<void> {
    try {
      await this.seedIfEmpty();
    } catch (err: any) {
      this.logger.warn(`Seed check skipped or failed: ${err.message}`);
    }
  }

  async seedIfEmpty(): Promise<void> {
    const heroCount = await this.heroRepo.count();
    if (heroCount === 0) {
      this.logger.log('Database is empty. Populating with initial portfolio data...');
      await this.seedAll();
      this.logger.log('✓ Initial portfolio data seeded successfully into PostgreSQL!');
    } else {
      this.logger.log('Database already contains data, skipping auto-seed.');
    }
  }

  async seedAll(): Promise<void> {
    // 1. Hero Profile
    await this.heroRepo.save(this.heroRepo.create(initialHeroProfile));

    // 2. About Me
    await this.aboutRepo.save(this.aboutRepo.create(initialAboutMe));

    // 3. Skills
    for (const skill of initialSkills) {
      await this.skillRepo.save(this.skillRepo.create(skill));
    }

    // 4. Services
    for (const s of initialServices) {
      await this.serviceRepo.save(this.serviceRepo.create(s));
    }

    // 5. Projects
    for (const p of initialProjects) {
      await this.projectRepo.save(this.projectRepo.create(p));
    }

    // 6. Work Experience
    for (const w of initialWorkExperiences) {
      await this.workRepo.save(this.workRepo.create(w));
    }

    // 7. Education
    for (const e of initialEducations) {
      await this.eduRepo.save(this.eduRepo.create(e));
    }

    // 8. Contact Info
    await this.contactRepo.save(this.contactRepo.create(initialContactInfo));
  }
}

