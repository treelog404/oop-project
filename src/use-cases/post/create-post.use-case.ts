import { Inject, Injectable } from "@nestjs/common";
import { CreatePostDto } from "src/domain/post/dto/create-post.dto";
import { GetPostDto } from "src/domain/post/dto/get-post.dto";
import { RegularPostFactory } from "src/domain/post/factories/regular-post.factory";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { Post } from "src/domain/post/post.entity";
import { IPostRepository } from "src/domain/post/post.repository.interface";
import { UserNotFoundException } from "src/domain/user/exceptions/user-not-found.exception";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class CreatePostUseCase {
    constructor(
        @Inject(IPostRepository)
        private readonly postRepository: IPostRepository,
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject()
        private readonly postFactory: RegularPostFactory,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(postData: CreatePostDto): Promise<GetPostDto> {
        const author = await this.userRepository.findById(postData.authorId)
        
        if (!author) throw new UserNotFoundException(postData.authorId)

        const newPost = this.postFactory.createPostFromDto(postData)
        newPost.author = author

        const savedPost = await this.postRepository.save(newPost)
        const postDto = this.postMapper.toDto(savedPost)

        return postDto
    }
}