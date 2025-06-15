import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { CommentNotFoundException } from "src/domain/comment/exceptions/comment-not-found.exception";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";
import { CommentRepository } from "src/infrastructure/sqlite/comment.repository";

@Injectable()
export class FindCommentByIdUseCase {
    constructor(
        @Inject(ICommentRepository)
        private readonly commentRepository: CommentRepository,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(commentId: number) {
        const comment = await this.commentRepository.findById(commentId)

        if (!comment) throw new CommentNotFoundException(commentId)

        const commentDto = this.commentMapper.toDto(comment)

        return commentDto
    }
}