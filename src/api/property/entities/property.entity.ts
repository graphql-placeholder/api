import { User } from '@/api/users/entities/user.entity';
import { Paginated } from '@/shared/object-types/paginationObject';
import { Field, ID, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
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
@Schema({ timestamps: true })
export class Property {
  @Field(() => ID)
  _id?: string;

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

  @Field(() => Date)
  createdAt?: Date;

  @Field(() => Date)
  updatedAt?: Date;

  @Field(() => [String], { nullable: true })
  @Prop()
  tags: string[];
}

export type PropertyDocument = HydratedDocument<Property>;
export const PropertySchema = SchemaFactory.createForClass(Property);

@ObjectType()
export class PropertyPagination extends Paginated(Property) {}
