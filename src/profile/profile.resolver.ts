import { Resolver, ResolveField, Parent } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Driver } from './entities/driver.entity';
import { VehicleService } from 'src/vehicle/vehicle.service';

@Resolver(() => Driver)
export class ProfileResolver {
  constructor(
    private readonly profileService: ProfileService,
    private readonly vehicleService: VehicleService,
  ) {}

  @ResolveField()
  async vehicles(@Parent() driver: Driver) {
    return await this.vehicleService.findOneOrAll({ driver: driver.id });
  }
}
