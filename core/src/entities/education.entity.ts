import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('educations')
export class EducationEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  period: string;

  @Column({ type: 'varchar', length: 255 })
  institution: string;

  @Column({ type: 'varchar', length: 150 })
  location: string;

  @Column({ type: 'varchar', length: 150 })
  degree: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'jsonb', default: () => "'[]'" })
  skills: string[];

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

