import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { UpdateCommentDto } from "src/domain/comment/dto/update-comment.dto";
import { CommentNotFoundException } from "src/domain/comment/exceptions/comment-not-found.exception";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";

@Injectable()
export class UpdateCommentUseCase {
    constructor(
        @Inject(ICommentRepository)
        private readonly commentRepository: ICommentRepository,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(commentData: UpdateCommentDto) {
        const comment = await this.commentRepository.findById(commentData.id)

        if (!comment) throw new CommentNotFoundException(commentData.id)

        Object.assign(comment, commentData)

        const updatedComment = await this.commentRepository.save(comment)
        const commentDto = this.commentMapper.toDto(updatedComment)

        return commentDto
    }
}