import { AppPaginationResponse } from '@/shared/contracts/app-pagination-response';
import { SortType } from '@/shared/dto/CommonPaginationDto';
import { ForbiddenException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { TagService } from '../tag/tag.service';
import { CreatePropertyInput } from './dto/create-property.input';
import { PropertyListQueryInput } from './dto/property-list.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { Property, PropertyDocument } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
    private readonly tagService: TagService,
  ) {}

  /**
   * Create a property
   * @param input CreatePropertyInput
   * @returns
   */
  async create(input: CreatePropertyInput, fields: string[] = []) {
    try {
      if (input.owners) {
        input.owners = input.owners.map((owner) => {
          return {
            ownershipPercentage: owner.ownershipPercentage,
            user: owner.ownerUID,
          };
        });
      }

      const property = await this.propertyModel.create({
        ...input,
        managers: input.managerIds,
      });

      return this.findOne({ _id: property._id }, fields);
    } catch (error) {
      throw new ForbiddenException(error);
    }
  }

  /**
   * Create many properties
   * @param input CreatePropertyInput[]
   * @returns
   */
  async createMany(input: CreatePropertyInput[]) {
    return this.propertyModel.insertMany(input);
  }

  async findAll(input: PropertyListQueryInput, fields: string[] = []) {
    const { page = 1, limit = 10 } = input;
    const where = {
      [input?.where?.key]: {
        [`$${input?.where?.operator}`]: input?.where?.value,
      },
    };

    const cursor = this.propertyModel.find(where);

    if (fields.includes('owners')) {
      cursor.populate({
        path: 'owners.user',
        model: 'User',
      });
    }

    if (fields.includes('managers')) {
      cursor.populate({
        path: 'managers',
      });
    }

    const count = await this.propertyModel.countDocuments(where);
    const skip = (page - 1) * limit;
    const data = await cursor
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? -1 : 1 })
      .skip(skip)
      .limit(limit);

    return new AppPaginationResponse(data, {
      currentPage: page,
      hasNextPage: page * limit < count,
      totalCount: count,
      totalPages: Math.ceil(count / limit),
    });
  }

  /**
   * Find a property
   * @param filter FilterQuery<PropertyDocument>
   * @returns
   */
  async findOne(filter: FilterQuery<PropertyDocument>, fields: string[] = []) {
    const cursor = this.propertyModel.findOne({ ...filter });

    if (fields.includes('owners')) {
      cursor.populate({
        path: 'owners.user',
        model: 'User',
      });
    }

    if (fields.includes('managers')) {
      cursor.populate({
        path: 'managers',
      });
    }

    const data = await cursor;
    return data;
  }

  /**
   * Update a property
   * @param filter FilterQuery<PropertyDocument>
   * @param input
   * @returns
   */
  async update(
    filter: FilterQuery<PropertyDocument>,
    input: UpdatePropertyInput,
  ) {
    try {
      await this.propertyModel.updateOne(filter, input);
      return this.findOne(filter);
    } catch (err) {
      console.log(err);
    }
  }

  /**
   * Remove a property
   * @param filter FilterQuery<PropertyDocument>
   * @returns
   */
  async remove(filter: FilterQuery<PropertyDocument>) {
    try {
      const res = await this.propertyModel.deleteOne(filter);
      return res.deletedCount > 0;
    } catch (err) {
      return false;
    }
  }
}
