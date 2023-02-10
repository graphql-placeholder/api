import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PostsService } from './posts.service';
import { PaginatedPost, Post } from './entities/post.entity';
import { CreatePostInput } from './dto/create-post.input';
import { UpdatePostInput } from './dto/update-post.input';
import { PostListQueryDto } from './dto/posts-list.dto';
import { graphQLListBuilder } from '@/shared/utils/gql-list-builder';

@Resolver(() => Post)
export class PostsResolver {
  constructor(private readonly postsService: PostsService) {}

  // @Mutation(() => Post)
  // createPost(@Args('createPostInput') createPostInput: CreatePostInput) {
  //   return this.postsService.create(createPostInput);
  // }

  @Query(() => PaginatedPost, { name: 'posts' })
  async findAll(@Args('input') input: PostListQueryDto) {
    const data = await this.postsService.findAll(input);
    return graphQLListBuilder(data);
  }

  // @Query(() => Post, { name: 'post' })
  // findOne(@Args('id', { type: () => Int }) id: number) {
  //   return this.postsService.findOne(id);
  // }

  // @Mutation(() => Post)
  // updatePost(@Args('updatePostInput') updatePostInput: UpdatePostInput) {
  //   return this.postsService.update(updatePostInput.id, updatePostInput);
  // }

  // @Mutation(() => Post)
  // removePost(@Args('id', { type: () => Int }) id: number) {
  //   return this.postsService.remove(id);
  // }
}
