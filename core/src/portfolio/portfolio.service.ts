import { Injectable, NotFoundException } from '@nestjs/common';
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
  ContactMessageEntity,
} from '../entities/index.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';

@Injectable()
export class PortfolioService {
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
    @InjectRepository(ContactMessageEntity)
    private readonly messageRepo: Repository<ContactMessageEntity>,
  ) {}

  async getHeroProfile(): Promise<HeroProfileEntity | null> {
    return this.heroRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async getAboutMe(): Promise<AboutMeEntity | null> {
    return this.aboutRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async getSkills(): Promise<SkillEntity[]> {
    return this.skillRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async getProjects(): Promise<ProjectEntity[]> {
    return this.projectRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async getProjectById(id: number): Promise<ProjectEntity> {
    const project = await this.projectRepo.findOne({ where: { id } });
    if (!project) {
      throw new NotFoundException(`Project with ID ${id} not found`);
    }
    return project;
  }

  async getServices(): Promise<ServiceEntity[]> {
    return this.serviceRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async getWorkExperiences(): Promise<WorkExperienceEntity[]> {
    return this.workRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async getEducations(): Promise<EducationEntity[]> {
    return this.eduRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async getContactInfo(): Promise<ContactInfoEntity | null> {
    return this.contactRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async createContactMessage(
    dto: CreateContactMessageDto,
  ): Promise<ContactMessageEntity> {
    const message = this.messageRepo.create(dto);
    return this.messageRepo.save(message);
  }

  async getContactMessages(): Promise<ContactMessageEntity[]> {
    return this.messageRepo.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Combined high-efficiency bundle returning all portfolio data for front-end SSR hydration.
   */
  async getAllPortfolioData() {
    const [
      profile,
      about,
      skills,
      projects,
      services,
      workExperiences,
      educations,
      contact,
    ] = await Promise.all([
      this.getHeroProfile(),
      this.getAboutMe(),
      this.getSkills(),
      this.getProjects(),
      this.getServices(),
      this.getWorkExperiences(),
      this.getEducations(),
      this.getContactInfo(),
    ]);

    return {
      profile,
      about,
      skills,
      projects,
      services,
      workExperiences,
      educations,
      contact,
    };
  }
}

