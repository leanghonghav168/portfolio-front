import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import type { SocialLinkDto } from './hero-profile.entity.js';

@Entity('contact_info')
export class ContactInfoEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, default: 'Contact' })
  categoryTag: string;

  @Column({ type: 'varchar', length: 255, default: 'Connect' })
  title: string;

  @Column({ type: 'varchar', length: 255 })
  email: string;

  @Column({ type: 'varchar', length: 255 })
  phoneNumbers: string;

  @Column({ type: 'varchar', length: 500 })
  officeAddress: string;

  @Column({ type: 'varchar', length: 500 })
  formattedAddress: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  socialLinks: SocialLinkDto[];
}

