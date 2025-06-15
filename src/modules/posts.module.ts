import { Module } from "@nestjs/common";
import { PostController } from "src/controllers/post.controller";
import { CreatePostUseCase } from "src/use-cases/post/create-post.use-case";
import { DeletePostUseCase } from "src/use-cases/post/delete-post.use-case";
import { FindPostByIdUseCase } from "src/use-cases/post/find-post-by-id.use-case";
import { GetPostCommentsUseCase } from "src/use-cases/post/get-post-comments.use-case";
import { GetPostsUseCase } from "src/use-cases/post/get-posts.use-case";
import { UpdatePostUseCase } from "src/use-cases/post/update-post.use-case";

@Module({
    controllers: [PostController],
    providers: [
        CreatePostUseCase,
        GetPostsUseCase,
        UpdatePostUseCase,
        FindPostByIdUseCase,
        DeletePostUseCase,
        GetPostCommentsUseCase,
    ]
})
export class PostsModule {}