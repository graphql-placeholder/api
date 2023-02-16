import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TagReferenceInput {
  @Field(() => String)
  referenceId: string;

  @Field(() => String)
  name: string;

  @Field(() => String, { nullable: true })
  description: string;

  @Field(() => String, { nullable: true })
  type: string;
}
