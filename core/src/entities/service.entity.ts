import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('services')
export class ServiceEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  title: string;

  @Column({ type: 'text' })
  description: string;

  @Column({ type: 'varchar', length: 50, default: 'layout' })
  iconType: string;

  @Column({ type: 'varchar', length: 100, nullable: true })
  iconClass?: string;

  @Column({ type: 'int', default: 0 })
  displayOrder: number;
}

