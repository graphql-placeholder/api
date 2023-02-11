import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { SERVICE_PROVIDER_TYPE } from '../entities/service-provider.entity';

@InputType()
export class PropertyServiceProviderInput {
  @Field(() => String)
  @IsNotEmpty()
  name: string;

  @Field(() => SERVICE_PROVIDER_TYPE, { nullable: true })
  @IsOptional()
  type?: SERVICE_PROVIDER_TYPE;

  @Field(() => String, { nullable: true })
  @IsOptional()
  note?: string;
}
