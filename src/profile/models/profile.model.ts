import { ObjectType, Field, Int } from '@nestjs/graphql';

@ObjectType()
export class Profile {
  @Field(() => Int)
  id: number;

  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  phoneNumber: string;

  @Field()
  isActive: boolean;
}
