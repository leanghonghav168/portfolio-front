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

  // ========================
  // HERO PROFILE
  // ========================
  async getHeroProfile(): Promise<HeroProfileEntity | null> {
    return this.heroRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async updateHeroProfile(data: Partial<HeroProfileEntity>): Promise<HeroProfileEntity> {
    let profile = await this.getHeroProfile();
    if (!profile) {
      profile = this.heroRepo.create(data);
    } else {
      Object.assign(profile, data);
    }
    return this.heroRepo.save(profile);
  }

  // ========================
  // ABOUT ME
  // ========================
  async getAboutMe(): Promise<AboutMeEntity | null> {
    return this.aboutRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async updateAboutMe(data: Partial<AboutMeEntity>): Promise<AboutMeEntity> {
    let about = await this.getAboutMe();
    if (!about) {
      about = this.aboutRepo.create(data);
    } else {
      Object.assign(about, data);
    }
    return this.aboutRepo.save(about);
  }

  // ========================
  // SKILLS
  // ========================
  async getSkills(): Promise<SkillEntity[]> {
    return this.skillRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async createSkill(data: Partial<SkillEntity>): Promise<SkillEntity> {
    const skill = this.skillRepo.create(data);
    return this.skillRepo.save(skill);
  }

  async updateSkill(id: number, data: Partial<SkillEntity>): Promise<SkillEntity> {
    const skill = await this.skillRepo.findOne({ where: { id } });
    if (!skill) throw new NotFoundException(`Skill #${id} not found`);
    Object.assign(skill, data);
    return this.skillRepo.save(skill);
  }

  async deleteSkill(id: number): Promise<{ success: boolean }> {
    const res = await this.skillRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
  }

  // ========================
  // PROJECTS
  // ========================
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

  async createProject(data: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const project = this.projectRepo.create(data);
    return this.projectRepo.save(project);
  }

  async updateProject(id: number, data: Partial<ProjectEntity>): Promise<ProjectEntity> {
    const project = await this.getProjectById(id);
    Object.assign(project, data);
    return this.projectRepo.save(project);
  }

  async deleteProject(id: number): Promise<{ success: boolean }> {
    const res = await this.projectRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
  }

  // ========================
  // SERVICES
  // ========================
  async getServices(): Promise<ServiceEntity[]> {
    return this.serviceRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async createService(data: Partial<ServiceEntity>): Promise<ServiceEntity> {
    const service = this.serviceRepo.create(data);
    return this.serviceRepo.save(service);
  }

  async updateService(id: number, data: Partial<ServiceEntity>): Promise<ServiceEntity> {
    const service = await this.serviceRepo.findOne({ where: { id } });
    if (!service) throw new NotFoundException(`Service #${id} not found`);
    Object.assign(service, data);
    return this.serviceRepo.save(service);
  }

  async deleteService(id: number): Promise<{ success: boolean }> {
    const res = await this.serviceRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
  }

  // ========================
  // EXPERIENCES & EDUCATION
  // ========================
  async getWorkExperiences(): Promise<WorkExperienceEntity[]> {
    return this.workRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async createWorkExperience(data: Partial<WorkExperienceEntity>): Promise<WorkExperienceEntity> {
    const item = this.workRepo.create(data);
    return this.workRepo.save(item);
  }

  async updateWorkExperience(id: number, data: Partial<WorkExperienceEntity>): Promise<WorkExperienceEntity> {
    const item = await this.workRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Work Experience #${id} not found`);
    Object.assign(item, data);
    return this.workRepo.save(item);
  }

  async deleteWorkExperience(id: number): Promise<{ success: boolean }> {
    const res = await this.workRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
  }

  async getEducations(): Promise<EducationEntity[]> {
    return this.eduRepo.find({
      order: { displayOrder: 'ASC', id: 'ASC' },
    });
  }

  async createEducation(data: Partial<EducationEntity>): Promise<EducationEntity> {
    const item = this.eduRepo.create(data);
    return this.eduRepo.save(item);
  }

  async updateEducation(id: number, data: Partial<EducationEntity>): Promise<EducationEntity> {
    const item = await this.eduRepo.findOne({ where: { id } });
    if (!item) throw new NotFoundException(`Education #${id} not found`);
    Object.assign(item, data);
    return this.eduRepo.save(item);
  }

  async deleteEducation(id: number): Promise<{ success: boolean }> {
    const res = await this.eduRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
  }

  // ========================
  // CONTACT INFO & MESSAGES
  // ========================
  async getContactInfo(): Promise<ContactInfoEntity | null> {
    return this.contactRepo.findOne({
      where: {},
      order: { id: 'ASC' },
    });
  }

  async updateContactInfo(data: Partial<ContactInfoEntity>): Promise<ContactInfoEntity> {
    let contact = await this.getContactInfo();
    if (!contact) {
      contact = this.contactRepo.create(data);
    } else {
      Object.assign(contact, data);
    }
    return this.contactRepo.save(contact);
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

  async markMessageAsRead(id: number, isRead = true): Promise<ContactMessageEntity> {
    const msg = await this.messageRepo.findOne({ where: { id } });
    if (!msg) throw new NotFoundException(`Message #${id} not found`);
    msg.isRead = isRead;
    return this.messageRepo.save(msg);
  }

  async deleteMessage(id: number): Promise<{ success: boolean }> {
    const res = await this.messageRepo.delete(id);
    return { success: (res.affected ?? 0) > 0 };
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
