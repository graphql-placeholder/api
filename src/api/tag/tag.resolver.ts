import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { CreateTagInput } from './dto/create-tag.input';
import { TagListQueryInput } from './dto/tag-list.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag, TagPagination } from './entities/tag.entity';
import { TagService } from './tag.service';

@Resolver(() => Tag)
export class TagResolver {
  constructor(private readonly tagService: TagService) {}

  @Mutation(() => Tag)
  createTag(@Args('input') createTagInput: CreateTagInput) {
    return this.tagService.create(createTagInput);
  }

  @Query(() => TagPagination, { name: 'tags', nullable: true })
  findAll(@Args('input') input: TagListQueryInput) {
    return this.tagService.findAll(input);
  }

  @Query(() => Tag, { name: 'tag' })
  findOne(@Args('id', { type: () => String }) id: string) {
    return this.tagService.findOne({ _id: id });
  }

  @Mutation(() => Tag)
  updateTag(@Args('input') updateTagInput: UpdateTagInput) {
    return this.tagService.update({ _id: updateTagInput.id }, updateTagInput);
  }

  @Mutation(() => Tag)
  removeTag(@Args('id', { type: () => String }) id: string) {
    return this.tagService.remove({ _id: id });
  }
}
