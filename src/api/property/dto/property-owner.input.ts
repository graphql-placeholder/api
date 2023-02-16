import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty } from 'class-validator';

@InputType()
export class PropertyOwnerInput {
  @Field(() => String)
  @IsNotEmpty()
  public ownerUID?: string;

  @Field(() => Number)
  @IsNotEmpty()
  public ownershipPercentage?: number;
}
