import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('skills')
export class SkillEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 100 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  percent: string;

  @Column({ type: 'varchar', length: 500 })
  img: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  category: string;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

