import { CommonMatchInput } from '@/shared/dto/CommonFindOneDto';
import { ForbiddenException } from '@nestjs/common';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateUserDTO } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
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

  @Mutation(() => User, { nullable: true })
  async updateUser(@Args('input') input: UpdateUserInput) {
    try {
      await this.usersService.updateUser({ _id: input.id }, input);
      return this.usersService.findOne({ _id: input.id });
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }

  @Mutation(() => Boolean, { nullable: true })
  async removeUser(@Args('input') input: CommonMatchInput) {
    try {
      const res = await this.usersService.deleteUser({
        [input.key]: { [`$${input.operator}`]: input.value },
      });
      return res.deletedCount > 0;
    } catch (error) {
      throw new ForbiddenException(error.message);
    }
  }
}
