import { Global, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { Comment } from "src/domain/comment/comment.entity";
import { Post } from "src/domain/post/post.entity";
import { IPostRepository } from "src/domain/post/post.repository.interface";
import { IUserRepository } from "src/domain/user/user.repository.interface";
import { CommentRepository } from "src/infrastructure/sqlite/comment.repository";
import { PostRepository } from "src/infrastructure/sqlite/post.repository";
import { UserRepository } from "src/infrastructure/sqlite/user.repository";
import { User } from "src/domain/user/user.entity";

@Global()
@Module({
    imports: [
        TypeOrmModule.forFeature([Comment]),
        TypeOrmModule.forFeature([Post]),
        TypeOrmModule.forFeature([User])
    ],
    providers: [
        {
          provide: IUserRepository,
          useClass: UserRepository
        },
        {
          provide: IPostRepository,
          useClass: PostRepository
        },
        {
          provide: ICommentRepository,
          useClass: CommentRepository
        }
    ],
    exports: [
        IUserRepository,
        IPostRepository,
        ICommentRepository
    ]
})
export class RepositoriesModule {}