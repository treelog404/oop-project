import { Inject, Injectable } from "@nestjs/common";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { CreateCommentDto } from "src/domain/comment/dto/create-comment.dto";
import { IPostRepository } from "src/domain/post/post.repository.interface";
import { IUserRepository } from "src/domain/user/user.repository.interface";
import { Comment } from "src/domain/comment/comment.entity";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";
import { UserNotFoundException } from "src/domain/user/exceptions/user-not-found.exception";
import { PostNotFoundException } from "src/domain/post/exceptions/post-not-found.exception";

@Injectable()
export class CreateCommentUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject(ICommentRepository)
        private readonly commentRepository: ICommentRepository,
        @Inject()
        private readonly commentMapper: CommentMapper
    ) {}

    async execute(commentData: CreateCommentDto) {
        const author = await this.userRepository.findById(commentData.authorId)

        if (!author) throw new UserNotFoundException(commentData.authorId)

        const post = await this.postRepository.findById(commentData.postId)

        if (!post) throw new PostNotFoundException(commentData.postId)

        const comment = new Comment()
        Object.assign(comment, commentData)

        comment.author = author
        comment.post = post

        const savedComment = await this.commentRepository.save(comment)
        const commentDto = this.commentMapper.toDto(savedComment)

        return commentDto
    }
}