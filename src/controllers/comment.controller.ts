import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreateCommentDto } from "src/domain/comment/dto/create-comment.dto";
import { UpdateCommentDto } from "src/domain/comment/dto/update-comment.dto";
import { CreateCommentUseCase } from "src/use-cases/comment/create-comment.use-case";
import { DeleteCommentUseCase } from "src/use-cases/comment/delete-comment.use.case";
import { FindCommentByIdUseCase } from "src/use-cases/comment/find-comment-by-id.use-case";
import { GetCommentsUseCase } from "src/use-cases/comment/get-comments.use-case";
import { UpdateCommentUseCase } from "src/use-cases/comment/update-comment.use-case";

@Controller('comments')
export class CommentController {
    constructor(
        private readonly createCommentUseCase: CreateCommentUseCase,
        private readonly updateCommentUseCase: UpdateCommentUseCase,
        private readonly deleteCommentUseCase: DeleteCommentUseCase,
        private readonly findCommentByIdUseCase: FindCommentByIdUseCase,
        private readonly getCommentsUseCase: GetCommentsUseCase
    ) {}

    @Get()
    async getAllComments(@Query('limit') limit?: number) {
        return await this.getCommentsUseCase.execute(limit)
    }

    @Get(':id')
    async findCommentById(@Param('id') commentId: number) {
        return await this.findCommentByIdUseCase.execute(commentId)
    }

    @Post()
    async createComment(@Body() commentData: CreateCommentDto) {
        return await this.createCommentUseCase.execute(commentData)
    }

    @Put()
    async updateComment(@Body() commentData: UpdateCommentDto) {
        return await this.updateCommentUseCase.execute(commentData)
    }

    @Delete(':id')
    async deleteComment(@Param('id') commentId: number) {
        return await this.deleteCommentUseCase.execute(commentId)
    }
}