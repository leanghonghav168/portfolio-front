import {
  Controller,
  Get,
  Post,
  Put,
  Patch,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';
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

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Health check endpoint
   * GET /api/portfolio/health
   */
  @Get('health')
  getHealth() {
    return {
      status: 'ok',
      service: 'portfolio-core',
      timestamp: new Date().toISOString(),
    };
  }

  /**
   * Primary bundle endpoint: returns complete portfolio payload for fast one-call hydration.
   * GET /api/portfolio
   */
  @Get()
  getAll() {
    return this.portfolioService.getAllPortfolioData();
  }

  // ========================
  // HERO PROFILE
  // ========================
  @Get('hero')
  getHero() {
    return this.portfolioService.getHeroProfile();
  }

  @Put('hero')
  updateHero(@Body() body: Partial<HeroProfileEntity>) {
    return this.portfolioService.updateHeroProfile(body);
  }

  // ========================
  // ABOUT ME
  // ========================
  @Get('about')
  getAbout() {
    return this.portfolioService.getAboutMe();
  }

  @Put('about')
  updateAbout(@Body() body: Partial<AboutMeEntity>) {
    return this.portfolioService.updateAboutMe(body);
  }

  // ========================
  // SKILLS
  // ========================
  @Get('skills')
  getSkills() {
    return this.portfolioService.getSkills();
  }

  @Post('skills')
  createSkill(@Body() body: Partial<SkillEntity>) {
    return this.portfolioService.createSkill(body);
  }

  @Put('skills/:id')
  updateSkill(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<SkillEntity>,
  ) {
    return this.portfolioService.updateSkill(id, body);
  }

  @Delete('skills/:id')
  deleteSkill(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteSkill(id);
  }

  // ========================
  // PROJECTS
  // ========================
  @Get('projects')
  getProjects() {
    return this.portfolioService.getProjects();
  }

  @Get('projects/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getProjectById(id);
  }

  @Post('projects')
  createProject(@Body() body: Partial<ProjectEntity>) {
    return this.portfolioService.createProject(body);
  }

  @Put('projects/:id')
  updateProject(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<ProjectEntity>,
  ) {
    return this.portfolioService.updateProject(id, body);
  }

  @Delete('projects/:id')
  deleteProject(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteProject(id);
  }

  // ========================
  // SERVICES
  // ========================
  @Get('services')
  getServices() {
    return this.portfolioService.getServices();
  }

  @Post('services')
  createService(@Body() body: Partial<ServiceEntity>) {
    return this.portfolioService.createService(body);
  }

  @Put('services/:id')
  updateService(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<ServiceEntity>,
  ) {
    return this.portfolioService.updateService(id, body);
  }

  @Delete('services/:id')
  deleteService(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteService(id);
  }

  // ========================
  // EXPERIENCES & EDUCATION
  // ========================
  @Get('experiences')
  async getExperiences() {
    const [work, education] = await Promise.all([
      this.portfolioService.getWorkExperiences(),
      this.portfolioService.getEducations(),
    ]);
    return { work, education };
  }

  @Post('experiences/work')
  createWorkExperience(@Body() body: Partial<WorkExperienceEntity>) {
    return this.portfolioService.createWorkExperience(body);
  }

  @Put('experiences/work/:id')
  updateWorkExperience(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<WorkExperienceEntity>,
  ) {
    return this.portfolioService.updateWorkExperience(id, body);
  }

  @Delete('experiences/work/:id')
  deleteWorkExperience(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteWorkExperience(id);
  }

  @Post('experiences/education')
  createEducation(@Body() body: Partial<EducationEntity>) {
    return this.portfolioService.createEducation(body);
  }

  @Put('experiences/education/:id')
  updateEducation(
    @Param('id', ParseIntPipe) id: number,
    @Body() body: Partial<EducationEntity>,
  ) {
    return this.portfolioService.updateEducation(id, body);
  }

  @Delete('experiences/education/:id')
  deleteEducation(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteEducation(id);
  }

  // ========================
  // CONTACT INFO
  // ========================
  @Get('contact')
  getContact() {
    return this.portfolioService.getContactInfo();
  }

  @Put('contact')
  updateContact(@Body() body: Partial<ContactInfoEntity>) {
    return this.portfolioService.updateContactInfo(body);
  }

  // ========================
  // CONTACT MESSAGES
  // ========================
  @Post('contact')
  @HttpCode(HttpStatus.CREATED)
  createMessage(@Body() dto: CreateContactMessageDto) {
    return this.portfolioService.createContactMessage(dto);
  }

  @Get('messages')
  getMessages() {
    return this.portfolioService.getContactMessages();
  }

  @Patch('messages/:id/read')
  markMessageRead(
    @Param('id', ParseIntPipe) id: number,
    @Body('isRead') isRead?: boolean,
  ) {
    return this.portfolioService.markMessageAsRead(id, isRead ?? true);
  }

  @Delete('messages/:id')
  deleteMessage(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.deleteMessage(id);
  }
}
