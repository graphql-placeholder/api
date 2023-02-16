import { Type } from '@nestjs/common';
import { Field, ObjectType } from '@nestjs/graphql';

export interface IPaginatedType<T> {
  nodes: T[];
}

@ObjectType()
export class PagniationMeta {
  @Field(() => Number)
  totalCount: number;

  @Field(() => Number)
  currentPage: number;

  @Field(() => Boolean)
  hasNextPage: boolean;

  @Field(() => Number)
  totalPages: number;
}

export function Paginated<T>(classRef: Type<T>) {
  @ObjectType({ isAbstract: true })
  abstract class PaginatedType {
    @Field(() => [classRef], { nullable: true })
    nodes: T[];

    @Field(() => PagniationMeta, { nullable: true })
    meta: string;
  }

  return PaginatedType;
}
