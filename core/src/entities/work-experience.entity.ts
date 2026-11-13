import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('work_experiences')
export class WorkExperienceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  period: string;

  @Column({ type: 'varchar', length: 255 })
  company: string;

  @Column({ type: 'varchar', length: 150 })
  location: string;

  @Column({ type: 'varchar', length: 150 })
  role: string;

  @Column({ type: 'varchar', length: 100, default: 'Full-time' })
  type: string;

  @Column({ type: 'boolean', default: false })
  isCurrent: boolean;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  highlights: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  skills: string[];

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

