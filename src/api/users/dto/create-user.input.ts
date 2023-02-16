import { Field, InputType } from '@nestjs/graphql';
import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';
import { USER_DOMAIN } from '../entities/user.entity';

@InputType()
export class UserAdditionalDocumentDTO {
  @Field(() => String, { nullable: true })
  public name?: string;

  @Field(() => String, { nullable: true })
  public note?: string;

  @Field(() => String, { nullable: true })
  public file?: string;
}

@InputType()
export class CreateUserDTO {
  @Field(() => String)
  @IsOptional()
  name: string;

  @Field(() => String)
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @Field(() => String, { nullable: true })
  @IsOptional()
  avatar: string;

  @Field(() => [String], { nullable: true })
  @IsOptional()
  contactNumbers: string[];

  @Field(() => [UserAdditionalDocumentDTO], { nullable: true })
  @IsOptional()
  additionalDocuments: UserAdditionalDocumentDTO[];

  @Field(() => USER_DOMAIN, { nullable: true })
  @IsOptional()
  domain: USER_DOMAIN;
}
