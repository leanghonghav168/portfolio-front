import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('projects')
export class ProjectEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  subtitle?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  client?: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  timeline?: string;

  @Column({ type: 'varchar', length: 150, nullable: true })
  role?: string;

  @Column({ type: 'text', nullable: true })
  impact?: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  categoryTags: string[];

  @Column({ type: 'jsonb', default: () => "'[]'" })
  techStack: string[];

  @Column({ type: 'varchar', length: 500 })
  img: string;

  @Column({ type: 'text', nullable: true })
  description?: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  deliverables?: string[];

  @Column({ type: 'varchar', length: 500, nullable: true })
  demoUrl?: string;

  @Column({ type: 'varchar', length: 500, nullable: true })
  repoUrl?: string;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;

  @Column({ type: 'boolean', default: false })
  isFeatured: boolean;
}

