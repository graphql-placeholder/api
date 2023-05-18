import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id?: string;

  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => [String], { nullable: true })
  public contactNumbers?: string[];

  @Field(() => String, { nullable: true })
  public avatar?: string;

  @Field(() => String, { nullable: false })
  public email: string;
}
