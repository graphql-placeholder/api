import { Field, InputType, PartialType } from '@nestjs/graphql';
import { CreateTagInput } from './create-tag.input';

@InputType()
export class UpdateTagInput extends PartialType(CreateTagInput) {
  @Field(() => String)
  id: string;
}
