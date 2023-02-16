import { Resolver, Query, Mutation, Args, Int, Info } from '@nestjs/graphql';
import { PropertyService } from './property.service';
import { Property, PropertyPagination } from './entities/property.entity';
import { CreatePropertyInput } from './dto/create-property.input';
import { UpdatePropertyInput } from './dto/update-property.input';
import { PropertyListQueryInput } from './dto/property-list.input';
import getGqlFields from '@/shared/utils/get-gql-fields';
import { CommonMatchInput } from '@/shared/dto/CommonFindOneDto';

@Resolver(() => Property)
export class PropertyResolver {
  constructor(private readonly propertyService: PropertyService) {}

  @Query(() => PropertyPagination, { name: 'properties', nullable: true })
  async findAll(
    @Args('input', { nullable: true }) input: PropertyListQueryInput,
    @Info() info: any,
  ) {
    const fields = getGqlFields(info, 'nodes');
    return this.propertyService.findAll(input, fields);
  }

  @Query(() => Property, { name: 'property', nullable: true })
  findOne(@Args('input') input: CommonMatchInput, @Info() info: any) {
    const fields = getGqlFields(info);
    return this.propertyService.findOne(
      {
        [input.key]: { [`$${input.operator}`]: input.value },
      },
      fields,
    );
  }

  @Mutation(() => Property, { nullable: true })
  async createProperty(@Args('input') input: CreatePropertyInput) {
    return this.propertyService.create(input);
  }

  @Mutation(() => Property)
  updateProperty(@Args('input') input: UpdatePropertyInput) {
    return this.propertyService.update({ _id: input.id }, input);
  }

  @Mutation(() => Boolean)
  removeProperty(@Args('id', { type: () => String }) id: string) {
    return this.propertyService.remove({ _id: id });
  }
}
