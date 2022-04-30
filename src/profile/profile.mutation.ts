import { Resolver, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';
import { Driver } from './entities/driver.entity';

@Resolver(() => Driver)
export class ProfileMutationResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Driver)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Driver> {
    return await this.profileService.create(createProfileInput);
  }

  @Mutation(() => Driver)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Driver)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
