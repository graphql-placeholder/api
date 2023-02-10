import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';

export enum SortType {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(SortType, {
  name: 'SortType',
});

@InputType()
export class CommonPaginationDto {
  @Field(() => Int)
  take: number;

  @Field(() => Int)
  offset: number;

  @Field(() => String, { nullable: true })
  after?: string;

  @Field(() => SortType, { nullable: true })
  sort?: SortType;

  @Field(() => String, { nullable: true })
  sortBy?: string;
}
