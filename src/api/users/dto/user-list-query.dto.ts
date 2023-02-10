import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class UserListQueryDto {
  @Field(() => Int, { nullable: true })
  take?: number;

  @Field(() => Int, { nullable: true })
  offset?: number;
}
