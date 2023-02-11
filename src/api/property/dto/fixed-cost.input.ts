import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class FixedCostInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => Int)
  @IsNotEmpty()
  amount: number;

  @Field(() => String)
  @IsNotEmpty()
  note: string;
}
