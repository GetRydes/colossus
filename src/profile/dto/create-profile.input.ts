import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateProfileInput {
  @Field()
  firstName: string;

  @Field()
  lastName: string;

  @Field()
  email: string;

  @Field()
  password: string;

  @Field()
  phoneNumber: string;
}
