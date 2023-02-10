import { Resolver, Query, Mutation, Args, Int, ID } from '@nestjs/graphql';
import { UsersService } from './users.service';
import { User, UserPagination } from './entities/user.entity';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { graphQLListBuilder } from '@/shared/utils/gql-list-builder';
import { CommonMatchInput } from '@/shared/dto/CommonFindOneDto';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User)
  createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.usersService.create(createUserInput);
  }

  @Query(() => UserPagination, { name: 'users' })
  async findAll(@Args('input') input: UserListQueryDto) {
    const data = await this.usersService.findAll(input);
    return graphQLListBuilder(data);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('input') input: CommonMatchInput) {
    return this.usersService.findOne(input);
  }

  @Mutation(() => User)
  updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
    return this.usersService.update(updateUserInput.id, updateUserInput);
  }

  @Mutation(() => User)
  removeUser(@Args('id', { type: () => Int }) id: number) {
    return this.usersService.remove(id);
  }
}