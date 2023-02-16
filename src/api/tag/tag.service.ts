import { AppPaginationResponse } from '@/shared/contracts/app-pagination-response';
import { SortType } from '@/shared/dto/CommonPaginationDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreateTagInput } from './dto/create-tag.input';
import { TagListQueryInput } from './dto/tag-list.input';
import { UpdateTagInput } from './dto/update-tag.input';
import { Tag, TagDocument } from './entities/tag.entity';

@Injectable()
export class TagService {
  constructor(@InjectModel(Tag.name) private tagModel: Model<TagDocument>) {}

  create(createTagInput: CreateTagInput) {
    return this.tagModel.create(createTagInput);
  }

  async findAll(input: TagListQueryInput) {
    const { page = 1, limit = 10 } = input;
    const where = {
      [input?.where?.key]: {
        [`$${input?.where?.operator}`]: input?.where?.value,
      },
    };

    const cursor = this.tagModel.find(where);
    const count = await this.tagModel.countDocuments(where);
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
   * Find one tag
   * @param filter
   * @returns
   */
  findOne(filter: FilterQuery<TagDocument>) {
    return this.tagModel.findOne(filter);
  }

  findManyByIds(ids: string[]) {
    return this.tagModel.find({ _id: { $in: ids } });
  }

  async update(filter: FilterQuery<TagDocument>, input: UpdateTagInput) {
    try {
      await this.tagModel.updateOne(filter, input);
      return this.findOne(filter);
    } catch (err) {
      console.log(err);
    }
  }

  async remove(filter: FilterQuery<TagDocument>) {
    try {
      const res = await this.tagModel.deleteOne(filter);
      return res.deletedCount > 0;
    } catch (err) {
      return false;
    }
  }
}
