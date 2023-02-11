import { Field, InputType, Int } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { PROPERTY_TYPE } from '../entities/property.entity';
import { FixedCostInput } from './fixed-cost.input';
import { PropertyServiceProviderInput } from './property-service-provider.input';

@InputType()
export class CreatePropertyInput {
  @Field(() => String, { description: 'Property name' })
  @IsNotEmpty()
  name: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  address?: string;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  numberOfUnits?: number;

  @Field(() => Int, { nullable: true })
  @IsOptional()
  defaultUnitRentAmount?: number;

  @Field(() => PROPERTY_TYPE, { nullable: true })
  @IsOptional()
  type?: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  photos?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  ownerIds?: string[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  managerIds?: string[];

  @Field(() => [PropertyServiceProviderInput], { nullable: true })
  @IsOptional()
  serviceProviders?: PropertyServiceProviderInput[];

  @Field(() => [String], { nullable: true })
  @IsOptional()
  variableCosts?: string[];

  @Field(() => [FixedCostInput], { nullable: true })
  fixedCosts?: FixedCostInput[];
}
