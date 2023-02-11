import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class FixedCost {
  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => Int)
  amount: number;

  @Prop()
  @Field(() => String)
  note: string;
}
