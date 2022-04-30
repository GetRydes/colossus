import { InputType, Int, Field } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class CreateVehicleInput {
  @Field(() => Int)
  driver: number;

  @IsNotEmpty()
  @Field()
  manufacturer: string;

  @IsNotEmpty()
  @Field()
  model_type: string;

  @IsNotEmpty()
  @Field()
  plate_number: string;

  @IsNotEmpty()
  @Field()
  color: string;

  @IsNotEmpty()
  @Field()
  chasis_number: string;

  @IsNotEmpty()
  @Field()
  year_of_make: string;
}
