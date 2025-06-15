import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";

@Injectable()
export class GetCommentsUseCase {
    constructor(
        @Inject(ICommentRepository)
        private readonly commentRepository: ICommentRepository,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(limit?: number) {
        const comments = await this.commentRepository.get(limit)
        const commentsDtos = this.commentMapper.toDto(comments)

        return commentsDtos
    }
}