import { Module } from '@nestjs/common';
import { UsersResolver } from './users.resolver';

@Module({
  imports: [],
  providers: [UsersResolver],
})
export class UsersModule {}
