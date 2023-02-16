import { Module } from '@nestjs/common';
import { PropertyService } from './property.service';
import { PropertyResolver } from './property.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { Property, PropertySchema } from './entities/property.entity';
import { TagModule } from '../tag/tag.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Property.name,
        schema: PropertySchema,
      },
    ]),
    TagModule,
  ],
  providers: [PropertyResolver, PropertyService],
})
export class PropertyModule {}
