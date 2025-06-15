import { Inject, Injectable } from "@nestjs/common";
import { GetPostDto } from "src/domain/post/dto/get-post.dto";
import { UpdatePostDto } from "src/domain/post/dto/update-post.dto";
import { PostNotFoundException } from "src/domain/post/exceptions/post-not-found.exception";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { IPostRepository } from "src/domain/post/post.repository.interface";

@Injectable()
export class UpdatePostUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(postData: UpdatePostDto): Promise<GetPostDto> {
        const post = await this.postRepository.findById(postData.id)

        if (!post) throw new PostNotFoundException(postData.id)

        Object.assign(post, postData)

        const updatedPost = await this.postRepository.save(post)

        const postDto = this.postMapper.toDto(updatedPost)

        return postDto
    }
}