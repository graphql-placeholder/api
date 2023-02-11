import { User } from '@/api/users/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class PropertyOwner {
  @Prop()
  @Field(() => User)
  public owner?: User;

  @Prop()
  @Field(() => Int)
  public ownershipPercentage?: number;
}
