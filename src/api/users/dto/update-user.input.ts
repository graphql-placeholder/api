import { CreateUserDTO } from './create-user.input';
import { InputType, Field, Int, PartialType } from '@nestjs/graphql';

@InputType()
export class UpdateUserInput extends PartialType(CreateUserDTO) {
  @Field(() => Int)
  id: number;
}
