import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateUserDTO } from './dto/create-user.input';
import { User, UserDocument } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<UserDocument>) {
    console.log('UserService created');
  }

  async findAll(): Promise<any[]> {
    return [];
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
