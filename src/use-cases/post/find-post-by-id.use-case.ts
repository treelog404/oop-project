import { Inject, Injectable } from "@nestjs/common";
import { GetPostDto } from "src/domain/post/dto/get-post.dto";
import { PostNotFoundException } from "src/domain/post/exceptions/post-not-found.exception";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { IPostRepository } from "src/domain/post/post.repository.interface";

@Injectable()
export class FindPostByIdUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(postId: number): Promise<GetPostDto> {
        const post = await this.postRepository.findById(postId)

        if (!post) throw new PostNotFoundException(postId)

        const postDto = this.postMapper.toDto(post)

        return postDto
    }
}