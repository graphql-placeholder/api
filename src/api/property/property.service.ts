import { SortType } from '@/shared/dto/CommonPaginationDto';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePropertyInput } from './dto/create-property.input';
import { PropertyListQueryInput } from './dto/property-list.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { Property, PropertyDocument } from './entities/property.entity';

@Injectable()
export class PropertyService {
  constructor(
    @InjectModel(Property.name) private propertyModel: Model<PropertyDocument>,
  ) {}

  async create(input: CreatePropertyInput) {
    return this.propertyModel.create(input);
  }

  async findAll(input: PropertyListQueryInput) {
    const { take, offset } = input;
    const data = await this.propertyModel
      .find({
        [input?.where?.key]: {
          [`$${input?.where?.operator}`]: input?.where?.value,
        },
      })
      .sort({ [input?.sortBy]: input?.sort == SortType.DESC ? 1 : -1 })
      .skip(offset)
      .limit(take);

    return data;
  }

  /**
   * Find a property
   * @param filter FilterQuery<PropertyDocument>
   * @returns
   */
  findOne(filter: FilterQuery<PropertyDocument>) {
    return this.propertyModel.findOne(filter);
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
