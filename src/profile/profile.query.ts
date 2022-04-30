import { Resolver, Query, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Driver } from './entities/driver.entity';

@Resolver(() => Driver)
export class ProfileQueryResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Query(() => [Driver], { name: 'profiles' })
  async findOneOrAll(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('email', { nullable: true }) email?: string,
  ): Promise<Driver[]> {
    return await this.profileService.findOneOrAll(id, email);
  }

  @Query(() => Driver, { name: 'profile', nullable: true })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }
}
