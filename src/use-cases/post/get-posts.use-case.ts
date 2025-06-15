import { Inject, Injectable } from "@nestjs/common";
import { GetPostDto } from "src/domain/post/dto/get-post.dto";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { IPostRepository } from "src/domain/post/post.repository.interface";

@Injectable()
export class GetPostsUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(limit?: number): Promise<GetPostDto[]> {
        const posts = await this.postRepository.get(limit)
        const postsDtos = this.postMapper.toDto(posts)

        return postsDtos
    }
}