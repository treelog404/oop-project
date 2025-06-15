import { Inject, Injectable } from "@nestjs/common";
import { DeletePostDto } from "src/domain/post/dto/delete-post.dto";
import { PostNotFoundException } from "src/domain/post/exceptions/post-not-found.exception";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { IPostRepository } from "src/domain/post/post.repository.interface";

@Injectable()
export class DeletePostUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(postId: number): Promise<DeletePostDto> {
        const post = await this.postRepository.delete(postId)

        if (!post) throw new PostNotFoundException(postId)

        const postDto = this.postMapper.toDeleteDto(post)

        return postDto
    }
}