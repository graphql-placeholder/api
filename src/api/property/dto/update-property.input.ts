import { Field, InputType, PartialType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';
import { CreatePropertyInput } from './create-property.input';

@InputType()
export class UpdatePropertyInput extends PartialType(CreatePropertyInput) {
  @Field(() => String)
  @IsNotEmpty()
  id: string;
}
