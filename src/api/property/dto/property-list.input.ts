import { CommonPaginationDto } from '@/shared/dto/CommonPaginationDto';
import { InputType } from '@nestjs/graphql';

@InputType()
export class PropertyListQueryInput extends CommonPaginationDto {}
