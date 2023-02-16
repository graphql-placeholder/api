import { Module } from '@nestjs/common';
import { TagService } from './tag.service';
import { TagResolver } from './tag.resolver';
import { MongooseModule } from '@nestjs/mongoose';
import { TagSchema } from './entities/tag.entity';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Tag', schema: TagSchema }])],
  providers: [TagResolver, TagService],
  exports: [TagService],
})
export class TagModule {}
