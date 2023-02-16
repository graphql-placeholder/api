import { User } from '@/api/users/entities/user.entity';
import { Field, Int, ObjectType } from '@nestjs/graphql';
import { Prop, Schema } from '@nestjs/mongoose';
import { Schema as MongooseSchema } from 'mongoose';

@ObjectType()
@Schema({ timestamps: true })
export class PropertyOwner {
  @Prop({ type: MongooseSchema.Types.ObjectId, ref: 'User' })
  @Field(() => User)
  public user?: User;

  @Prop()
  @Field(() => Int)
  public ownershipPercentage?: number;
}
