import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { CommentNotFoundException } from "src/domain/comment/exceptions/comment-not-found.exception";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";

@Injectable()
export class DeleteCommentUseCase {
    constructor(
        @Inject(ICommentRepository)
        private readonly commentRepository: ICommentRepository,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(commentId: number) {
        const comment = await this.commentRepository.delete(commentId)

        if (!comment) throw new CommentNotFoundException(commentId)

        const commentDto = this.commentMapper.toDeleteDto(comment)

        return commentDto
    }
}