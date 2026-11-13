import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

export interface SocialLinkDto {
  name: string;
  url: string;
  icon: string;
  ariaLabel?: string;
}

@Entity('hero_profiles')
export class HeroProfileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  firstName: string;

  @Column({ type: 'varchar', length: 100 })
  lastName: string;

  @Column({ type: 'varchar', length: 150 })
  greeting: string;

  @Column({ type: 'varchar', length: 255 })
  role: string;

  @Column({ type: 'varchar', length: 50, default: '100+' })
  clientsCount: string;

  @Column({ type: 'varchar', length: 500 })
  portraitImg: string;

  @Column({ type: 'varchar', length: 255, default: '#contact' })
  talkCtaUrl: string;

  @Column({ type: 'varchar', length: 255, default: '#projects' })
  projectCtaUrl: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  socialLinks: SocialLinkDto[];
}

