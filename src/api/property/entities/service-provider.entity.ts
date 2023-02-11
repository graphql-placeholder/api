import { Field, ObjectType, registerEnumType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

export enum SERVICE_PROVIDER_TYPE {
  SECURITY = 'SECURITY',
  CLEANING = 'CLEANING',
  MAINTENANCE = 'MAINTENANCE',
  OTHER = 'OTHER',
}

registerEnumType(SERVICE_PROVIDER_TYPE, {
  name: 'SERVICE_PROVIDER_TYPE',
});

@ObjectType()
@Schema({ timestamps: true })
export class PropertyServiceProvider {
  @Prop()
  @Field(() => String)
  name: string;

  @Prop()
  @Field(() => SERVICE_PROVIDER_TYPE, { nullable: true })
  type?: SERVICE_PROVIDER_TYPE;

  @Prop()
  @Field(() => String, { nullable: true })
  note?: string;
}
