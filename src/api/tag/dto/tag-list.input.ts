import { CommonPaginationDto } from '@/shared/dto/CommonPaginationDto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class TagListQueryInput extends CommonPaginationDto {}
