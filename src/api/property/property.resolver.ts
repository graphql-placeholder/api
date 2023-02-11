import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Mutation(() => Property)
  createProperty(@Args('createPropertyInput') createPropertyInput: CreatePropertyInput) {
    return this.propertyService.create(createPropertyInput);
  }

  @Query(() => [Property], { name: 'property' })
  findAll() {
    return this.propertyService.findAll();
  }

  @Query(() => Property, { name: 'property' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.propertyService.findOne(id);
  }

  @Mutation(() => Property)
  updateProperty(@Args('updatePropertyInput') updatePropertyInput: UpdatePropertyInput) {
    return this.propertyService.update(updatePropertyInput.id, updatePropertyInput);
  }

  @Mutation(() => Property)
  removeProperty(@Args('id', { type: () => Int }) id: number) {
    return this.propertyService.remove(id);
  }
}
