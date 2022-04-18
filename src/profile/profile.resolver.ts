import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ProfileService } from './profile.service';
import { Profile } from './models/profile.model';
import { CreateProfileInput } from './dto/create-profile.input';
import { UpdateProfileInput } from './dto/update-profile.input';

@Resolver(() => Profile)
export class ProfileResolver {
  constructor(private readonly profileService: ProfileService) {}

  @Mutation(() => Profile)
  async createProfile(
    @Args('createProfileInput') createProfileInput: CreateProfileInput,
  ): Promise<Profile> {
    return await this.profileService.create(createProfileInput);
  }

  @Query(() => [Profile], { name: 'profiles' })
  async findOneOrAll(
    @Args('id', { type: () => Int, nullable: true }) id?: number,
    @Args('email', { nullable: true }) email?: string,
  ) {
    return await this.profileService.findOneOrAll(id, email);
  }

  @Query(() => Profile, { name: 'profile' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.findOne(id);
  }

  @Mutation(() => Profile)
  updateProfile(
    @Args('updateProfileInput') updateProfileInput: UpdateProfileInput,
  ) {
    return this.profileService.update(
      updateProfileInput.id,
      updateProfileInput,
    );
  }

  @Mutation(() => Profile)
  removeProfile(@Args('id', { type: () => Int }) id: number) {
    return this.profileService.remove(id);
  }
}
