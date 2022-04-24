import { Field, Int, ObjectType } from '@nestjs/graphql';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  JoinColumn,
  ManyToOne,
} from 'typeorm';
import { Driver } from '../../profile/entities/driver.entity';

@ObjectType()
@Entity({ name: 'vehicle' })
export class Vehicle {
  @Field(() => Int)
  @PrimaryGeneratedColumn()
  id: number;

  @Field(() => Driver)
  @ManyToOne(() => Driver, (driver) => driver.vehicles)
  @JoinColumn()
  driver: Driver;

  @Field()
  @Column()
  manufacturer: string;

  @Field()
  @Column()
  model_type: string;

  @Field()
  @Column()
  plate_number: string;

  @Field()
  @Column()
  color: string;

  @Field()
  @Column()
  chasis_number: string;

  @Field()
  @Column()
  year_of_make: string;

  @Field()
  @CreateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
  })
  created_at!: Date;

  @Field()
  @UpdateDateColumn({
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP(6)',
    onUpdate: 'CURRENT_TIMESTAMP(6)',
  })
  updated_at!: Date;
}
