import { Module } from "@nestjs/common";
import { CommentController } from "src/controllers/comment.controller";
import { CreateCommentUseCase } from "src/use-cases/comment/create-comment.use-case";
import { DeleteCommentUseCase } from "src/use-cases/comment/delete-comment.use.case";
import { FindCommentByIdUseCase } from "src/use-cases/comment/find-comment-by-id.use-case";
import { GetCommentsUseCase } from "src/use-cases/comment/get-comments.use-case";
import { UpdateCommentUseCase } from "src/use-cases/comment/update-comment.use-case";

@Module({
    controllers: [CommentController],
    providers: [
        CreateCommentUseCase,
        GetCommentsUseCase,
        UpdateCommentUseCase,
        FindCommentByIdUseCase,
        DeleteCommentUseCase,
    ]
})
export class CommentsModule {}