import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Driver } from './driver.entity';

@Entity({ name: 'vehicle' })
export class Vehicle {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Driver, (driver) => driver.vehicles)
  @JoinColumn()
  driver: Driver;

  @Column()
  manufacturer: string;

  @Column()
  model_type: string;

  @Column()
  plate_number: string;

  @Column()
  color: string;

  @Column()
  chasis_number: string;

  @Column()
  year_of_make: string;

  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;
}
