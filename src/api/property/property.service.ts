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

  findOne(id: number) {
    return `This action returns a #${id} property`;
  }

  update(
    filter: FilterQuery<PropertyDocument>,
    updatePropertyInput: UpdatePropertyInput,
  ) {
    return this.propertyModel.updateOne(filter, updatePropertyInput);
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
