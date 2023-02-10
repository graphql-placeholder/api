import { LocalDatabaseDriver } from '@/db';
import { Injectable } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { UserListQueryDto } from './dto/user-list-query.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: User[] = [];

  create(createUserInput: CreateUserInput) {
    return 'This action adds a new user';
  }

  findAll(payload: UserListQueryDto) {
    const db = new LocalDatabaseDriver('users');
    return db.list({ take: payload.take, offset: payload.offset });
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
