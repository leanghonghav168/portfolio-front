import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('about_me')
export class AboutMeEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100, default: 'About Me' })
  categoryTag: string;

  @Column({ type: 'varchar', length: 300 })
  headline: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  highlightWords: string[];

  @Column({ type: 'text' })
  bioText: string;

  @Column({ type: 'varchar', length: 500 })
  portraitImg: string;

  @Column({ type: 'boolean', default: true })
  isAvailableForWork: boolean;

  @Column({ type: 'varchar', length: 100, default: 'Available for Work' })
  availableBadgeText: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  leftSpecialties: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  rightSpecialties: string[];
}

