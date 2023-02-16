import { AppPaginationResponse } from '@/shared/contracts/app-pagination-response';
import { SortType } from '@/shared/dto/CommonPaginationDto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log('UserService created');
  }

  /**
   * Find all users
   * @param input  UserListQueryDto
   * @returns
   */
  async findAll(input: UserListQueryDto) {
    const { page = 1, limit = 10 } = input;
    const where = {
      [input?.where?.key]: {
        [`$${input?.where?.operator}`]: input?.where?.value,
      },
    };

    const cursor = this.userModel.find(where);
    const count = await this.userModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    return new AppPaginationResponse(data, {
      totalCount: count,
      currentPage: page,
      hasNextPage: page * limit < count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * Find a user
   * @param filter
   */
  async findOne(filter: FilterQuery<UserDocument>) {
    return this.userModel.findOne(filter);
  }

  /**
   * Create a new user
   * @param body
   */
  async createUser(body: CreateUserDTO) {
    const user = await this.findOne({
      $and: [{ $or: [{ email: body.email }] }],
    });

    if (user) {
      throw new ForbiddenException('User already exists');
    }

    return this.userModel.create({
      ...body,
      // password: hashSync(body.password, 10),
    });
  }

  /**
   * Update a user
   * @param filter
   * @param body
   */
  // async updateUser(filter: FilterQuery<UserDocument>, body: UpdateUserDto) {
  //   return this.userModel.updateOne(filter, body);
  // }

  /**
   * Delete a user
   * @param filter
   * @returns
   */
  // async deleteUser(filter: FilterQuery<UserDocument>) {
  //   return this.userModel.deleteOne(filter);
  // }

  /**
   * Compare password
   * @param user User
   * @param password
   * @returns
   */
  // comparePassword(user: UserDocument, password: string): boolean {
  //   return compareSync(password, user.password);
  // }
}
function hashSync(password: any, arg1: number): any {
  throw new Error('Function not implemented.');
}
