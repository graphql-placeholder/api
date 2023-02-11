import { Field, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@Schema({ timestamps: true })
@ObjectType()
export class UserPaymentInformation {
  @Prop()
  @Field(() => String, { nullable: true })
  public type?: 'MFS' | 'BANK';

  @Prop()
  @Field(() => String, { nullable: true })
  public providerName?: string;
}
