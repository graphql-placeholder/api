import { Field, InputType, Int, registerEnumType } from '@nestjs/graphql';
import { IsNotEmpty, IsOptional } from 'class-validator';
import { CommonMatchInput } from './CommonFindOneDto';

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
  @IsNotEmpty()
  take: number;

  @Field(() => Int)
  @IsNotEmpty()
  offset: number;

  @Field(() => String, { nullable: true })
  @IsOptional()
  after?: string;

  @Field(() => SortType, { nullable: true })
  @IsOptional()
  sort?: SortType;

  @Field(() => String, { nullable: true })
  @IsOptional()
  sortBy?: string;

  @Field(() => CommonMatchInput, { nullable: true })
  @IsOptional()
  where?: CommonMatchInput;
}
