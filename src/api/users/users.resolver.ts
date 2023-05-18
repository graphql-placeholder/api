import { Args, Query, Resolver } from '@nestjs/graphql';
import { UserListQueryDto } from './dto/user-list-query.dto';

@Resolver()
export class UsersResolver {
  @Query(() => String, { name: 'users', nullable: true })
  async findAll(@Args('input', { nullable: true }) input: UserListQueryDto) {
    return 'This action returns all users';
  }
}
