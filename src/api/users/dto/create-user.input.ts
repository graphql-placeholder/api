import { Field, InputType } from '@nestjs/graphql';
import { IsOptional } from 'class-validator';

@InputType()
export class CreateUserDTO {
  @Field(() => String)
  @IsOptional()
  name: string;
}
