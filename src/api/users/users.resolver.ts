import { CommonMatchInput } from '@/shared/dto/CommonFindOneDto';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/create-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserPagination } from './entities/user.entity';
import { UsersService } from './users.service';

@Resolver(() => User)
export class UsersResolver {
  constructor(private readonly usersService: UsersService) {}

  @Mutation(() => User, { nullable: true })
  createUser(@Args('input') input: CreateUserDTO) {
    return this.usersService.createUser(input);
  }

  @Query(() => UserPagination, { name: 'users', nullable: true })
  async findAll(@Args('input', { nullable: true }) input: UserListQueryDto) {
    return this.usersService.findAll(input);
  }

  @Query(() => User, { name: 'user', nullable: true })
  async findOne(@Args('input') input: CommonMatchInput) {
    return this.usersService.findOne({
      [input.key]: { [`$${input.operator}`]: input.value },
    });
  }

  // @Mutation(() => User)
  // updateUser(@Args('updateUserInput') updateUserInput: UpdateUserInput) {
  //   // return this.usersService.update(updateUserInput.id, updateUserInput);
  // }

  // @Mutation(() => User)
  // removeUser(@Args('id', { type: () => Int }) id: number) {
  //   // return this.usersService.remove(id);
  // }
}
