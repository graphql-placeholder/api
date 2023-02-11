import { User } from '@/api/users/entities/user.entity';
import { ObjectType, Field, Int, registerEnumType } from '@nestjs/graphql';
import { Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { FixedCost } from './fixed-cost.entity';
import { PropertyOwner } from './property-owner.entity';
import { PropertyServiceProvider } from './service-provider.entity';

export enum PROPERTY_TYPE {
  APARTMENT = 'APARTMENT',
  HOUSE = 'HOUSE',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  OFFICE = 'OFFICE',
}

registerEnumType(PROPERTY_TYPE, {
  name: 'PROPERTY_TYPE',
});

@ObjectType()
export class Property {
  @Prop()
  @Field(() => String, { description: 'Property name' })
  name: string;

  @Prop()
  @Field(() => String, { nullable: true })
  address?: string;

  @Prop()
  @Field(() => Int, { nullable: true })
  numberOfUnits?: number;

  @Prop()
  @Field(() => Int, { nullable: true })
  defaultUnitRentAmount?: number;

  @Prop()
  @Field(() => PROPERTY_TYPE, { nullable: true })
  type?: string;

  @Prop()
  @Field(() => [String], { nullable: true })
  photos?: string[];

  @Prop()
  @Field(() => [PropertyOwner], { nullable: true })
  owners?: PropertyOwner[];

  @Prop()
  @Field(() => [User], { nullable: true })
  managers?: User[];

  @Prop()
  @Field(() => [PropertyServiceProvider], { nullable: true })
  serviceProviders?: PropertyServiceProvider[];

  @Prop()
  @Field(() => [String], { nullable: true })
  variableCosts?: string[];

  @Prop()
  @Field(() => [FixedCost], { nullable: true })
  fixedCosts?: FixedCost[];
}

export type PropertyDocument = HydratedDocument<Property>;
export const PropertySchema = SchemaFactory.createForClass(Property);
