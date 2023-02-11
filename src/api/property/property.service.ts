import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';
import { CreatePropertyInput } from './dto/create-property.input';
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

  findAll() {
    return `This action returns all property`;
  }

  findOne(filter: FilterQuery<PropertyDocument>) {
    return this.propertyModel.findOne(filter);
  }

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
  remove(filter: FilterQuery<PropertyDocument>) {
    return this.propertyModel.deleteOne(filter);
  }
}
