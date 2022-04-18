import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from 'src/data-access/entities/driver.entity';

@Module({
  providers: [ProfileResolver, ProfileService],
  imports: [TypeOrmModule.forFeature([Driver])],
})
export class ProfileModule {}
