import { Inject, Injectable } from "@nestjs/common";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";
import { PostWithCommentsDto } from "src/domain/post/dto/post-with-comments.dto";
import { PostNotFoundException } from "src/domain/post/exceptions/post-not-found.exception";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { IPostRepository } from "src/domain/post/post.repository.interface";

@Injectable()
export class GetPostCommentsUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject()
        private readonly postMapper: PostMapper,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(postId: number): Promise<PostWithCommentsDto> {
        const post = await this.postRepository.getComments(postId)

        if (!post) throw new PostNotFoundException(postId)

        const commentsDto = this.commentMapper.toWithAuthorDto(post.comments)
        const postDto = this.postMapper.toWithCommentsDto(post, commentsDto)

        return postDto
    }
}