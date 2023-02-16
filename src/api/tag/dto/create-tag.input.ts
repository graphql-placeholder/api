import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';

@InputType()
export class CreateTagInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  description: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  type: string;
}
