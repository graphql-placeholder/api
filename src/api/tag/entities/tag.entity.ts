import { Paginated } from '@/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class Tag {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  @Prop()
  name: string;

  @Field(() => String, { nullable: true })
  @Prop()
  description: string;

  @Field(() => String, { nullable: true })
  @Prop()
  type: string;
}

export type TagDocument = HydratedDocument<Tag>;
export const TagSchema = SchemaFactory.createForClass(Tag);

@ObjectType()
export class TagPagination extends Paginated(Tag) {}
