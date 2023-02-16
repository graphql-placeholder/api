import { Field, ObjectType } from '@nestjs/graphql';
import { Prop } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
export class TagReference {
  @Field(() => String)
  @Prop()
  referenceId: string;

  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  description: string;

  @Prop()
  @Field(() => String, { nullable: true })
  type: string;
}

export type TagReferenceDocument = HydratedDocument<TagReference>;
