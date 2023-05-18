import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './api/users/users.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
    // ---------------------------------------------------------
    //  Support modules
    // ---------------------------------------------------------
    ConfigModule.forRoot({
      isGlobal: true,
      // load: configs,
      envFilePath: ['.env.prod', '.env.dev', '.env'],
    }),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      playground: true,
      introspection: true,
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    // ---------------------------------------------------------
    // Application modules
    // ---------------------------------------------------------
    UsersModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
