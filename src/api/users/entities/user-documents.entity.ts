import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class UserAdditionalDocument {
  @Prop()
  @Field(() => String, { nullable: true })
  public name?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public note?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public file?: string;
}
