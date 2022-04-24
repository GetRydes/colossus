import { Module } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileResolver } from './profile.resolver';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './entities/driver.entity';
import { ProfileMutationResolver } from './profile.mutation';
import { ProfileQueryResolver } from './profile.query';
import { VehicleModule } from 'src/vehicle/vehicle.module';

@Module({
  providers: [
    ProfileResolver,
    ProfileService,
    ProfileMutationResolver,
    ProfileQueryResolver,
  ],
  imports: [TypeOrmModule.forFeature([Driver]), VehicleModule],
})
export class ProfileModule {}
