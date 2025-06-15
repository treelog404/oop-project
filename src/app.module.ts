import { Module } from '@nestjs/common';
import { typeOrmConfig } from './typeorm.config';
import { UsersModule } from './modules/users.module';
import { PostsModule } from './modules/posts.module';
import { CommentsModule } from './modules/comments.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RepositoriesModule } from './modules/repositories.module';
import { FactoriesModule } from './modules/factories.module';
import { MappersModule } from './modules/mappers.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    RepositoriesModule,
    FactoriesModule,
    MappersModule,
    UsersModule,
    PostsModule,
    CommentsModule
  ]
})
export class AppModule {}
