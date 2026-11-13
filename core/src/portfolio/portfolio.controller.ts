import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  ParseIntPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { PortfolioService } from './portfolio.service.js';
import { CreateContactMessageDto } from './dto/create-contact-message.dto.js';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

  /**
   * Primary bundle endpoint: returns complete portfolio payload for fast one-call hydration.
   * GET /api/portfolio
   */
  @Get()
  getAll() {
    return this.portfolioService.getAllPortfolioData();
  }

  /**
   * GET /api/portfolio/hero
   */
  @Get('hero')
  getHero() {
    return this.portfolioService.getHeroProfile();
  }

  /**
   * GET /api/portfolio/about
   */
  @Get('about')
  getAbout() {
    return this.portfolioService.getAboutMe();
  }

  /**
   * GET /api/portfolio/skills
   */
  @Get('skills')
  getSkills() {
    return this.portfolioService.getSkills();
  }

  /**
   * GET /api/portfolio/projects
   */
  @Get('projects')
  getProjects() {
    return this.portfolioService.getProjects();
  }

  /**
   * GET /api/portfolio/projects/:id
   */
  @Get('projects/:id')
  getProjectById(@Param('id', ParseIntPipe) id: number) {
    return this.portfolioService.getProjectById(id);
  }

  /**
   * GET /api/portfolio/services
   */
  @Get('services')
  getServices() {
    return this.portfolioService.getServices();
  }

  /**
   * GET /api/portfolio/experiences
   */
  @Get('experiences')
  async getExperiences() {
    const [work, education] = await Promise.all([
      this.portfolioService.getWorkExperiences(),
      this.portfolioService.getEducations(),
    ]);
    return { work, education };
  }

  /**
   * GET /api/portfolio/contact
   */
  @Get('contact')
  getContact() {
    return this.portfolioService.getContactInfo();
  }

  /**
   * POST /api/portfolio/contact
   * Submit a contact message from the frontend ConnectSection form.
   */
  @Post('contact')
  @HttpCode(HttpStatus.CREATED)
  createMessage(@Body() dto: CreateContactMessageDto) {
    return this.portfolioService.createContactMessage(dto);
  }

  /**
   * GET /api/portfolio/messages
   * Retrieve visitor contact messages.
   */
  @Get('messages')
  getMessages() {
    return this.portfolioService.getContactMessages();
  }
}

