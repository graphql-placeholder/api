import { Field, InputType, Int } from '@nestjs/graphql';

@InputType()
export class CommonPaginationDto {
  @Field(() => Int)
  take: number;

  @Field(() => Int)
  offset: number;

  @Field(() => String, { nullable: true })
  after?: string;
}
