import { Field, ObjectType } from '@nestjs/graphql';
import { Driver } from 'src/profile/entities/driver.entity';

@ObjectType()
export class SignToken {
  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;

  @Field(() => Driver)
  driver: Driver;
}
