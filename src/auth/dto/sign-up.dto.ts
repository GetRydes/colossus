import { InputType, Field } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty } from 'class-validator';

@InputType()
export class SignUpInput {
  @IsNotEmpty()
  @Field()
  firstName: string;

  @IsNotEmpty()
  @Field()
  lastName: string;

  @Field()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Field()
  password: string;

  @IsNotEmpty()
  @Field()
  phoneNumber: string;
}
