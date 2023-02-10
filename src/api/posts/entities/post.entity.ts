import { User } from '@/api/users/entities/user.entity';
import { Paginated } from '@/shared/object-types/paginationObject';
import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Post {
  @Field(() => ID)
  _id: string;

  @Field(() => String)
  title: string;

  @Field(() => String)
  body: string;

  @Field(() => String, { nullable: true })
  thumbnail: string;

  @Field(() => Boolean, { nullable: true })
  isPublished: boolean;

  @Field(() => User, { nullable: true })
  author: User;
}

@ObjectType()
export class PaginatedPost extends Paginated(Post) {}
