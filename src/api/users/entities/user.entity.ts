import { Paginated } from '@/shared/object-types/paginationObject';
import { ObjectType, Field, ID, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { UserAdditionalDocument } from './user-documents.entity';
import { UserPaymentInformation } from './user-payment-information.dto';

export enum USER_DOMAIN {
  OWNER = 'OWNER',
  PROPERTY_OWNER = 'PROPERTY_OWNER',
  UNIT_OWNER = 'UNIT_OWNER',
  MANAGER = 'MANAGER',
  SECURITY_GUARD = 'SECURITY_GUARD',
}

registerEnumType(USER_DOMAIN, {
  name: 'USER_DOMAIN',
});

@ObjectType()
@Schema({ timestamps: true, collection: 'users' })
export class User {
  @Field(() => ID)
  _id?: string;

  @Prop()
  @Field(() => String, { nullable: true })
  public name?: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  public contactNumbers?: string[];

  @Prop({ required: false })
  @Field(() => String, { nullable: true })
  public avatar?: string;

  @Prop({ required: true })
  @Field(() => String, { nullable: false })
  public email: string;

  @Prop()
  @Field(() => [UserAdditionalDocument], { nullable: true })
  public additionalDocuments?: UserAdditionalDocument[];

  @Prop()
  @Field(() => [UserPaymentInformation], { nullable: true })
  public paymentInformations?: UserPaymentInformation;

  @Prop()
  @Field(() => USER_DOMAIN, { nullable: true })
  public domain?: USER_DOMAIN;
}

export type UserDocument = HydratedDocument<User>;
export const UserSchema = SchemaFactory.createForClass(User);

@ObjectType()
export class UserPagination extends Paginated(User) {}
