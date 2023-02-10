import { Paginated } from '@/shared/object-types/paginationObject';
import { ObjectType, Field, ID } from '@nestjs/graphql';

@ObjectType()
export class User {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  first_name: string;

  @Field(() => String)
  last_name: string;

  @Field(() => String)
  email: string;

  @Field(() => String)
  gender: string;

  @Field(() => String)
  avatar: string;
}

@ObjectType()
export class UserPagination extends Paginated(User) {}
