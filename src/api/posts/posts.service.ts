import { IMatchPayload, LocalDatabaseDriver } from '@/db';
import { Injectable } from '@nestjs/common';
import { CreatePostInput } from './dto/create-post.input';
import { PostListQueryDto } from './dto/posts-list.dto';
import { UpdatePostInput } from './dto/update-post.input';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  private _postsDB = new LocalDatabaseDriver('posts');
  private _usersDB = new LocalDatabaseDriver('users');

  create(createPostInput: CreatePostInput) {
    return 'This action adds a new post';
  }

  findAll(payload: PostListQueryDto) {
    return this._postsDB.list({
      take: payload.take,
      offset: payload.offset,
      after: payload.after,
      sort: payload.sort,
      sortBy: payload.sortBy,
      where: payload.where,
    });
  }

  resolveAuthorField(post: Post) {
    return this._usersDB.findOne({
      key: '_id',
      operator: 'eq',
      value: post.author,
    });
  }

  findOne(payload: IMatchPayload) {
    return this._postsDB.findOne(payload);
  }

  update(id: number, updatePostInput: UpdatePostInput) {
    return `This action updates a #${id} post`;
  }

  remove(id: number) {
    return `This action removes a #${id} post`;
  }
}
