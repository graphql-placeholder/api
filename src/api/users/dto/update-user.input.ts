import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreateUserDTO } from './create-user.input';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDTO) {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
