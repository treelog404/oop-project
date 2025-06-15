import { Inject, Injectable } from "@nestjs/common";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { GetUserPostsDto } from "src/domain/user/dto/get-user-posts.dto";
import { UserNotFoundException } from "src/domain/user/exceptions/user-not-found.exception";
import { UserMapper } from "src/domain/user/mappers/user.mapper";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class GetUserPostsUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject()
        private readonly userMapper: UserMapper,
        @Inject()
        private readonly postMapper: PostMapper
    ) {}

    async execute(userId: number): Promise<GetUserPostsDto> {
        const userWithPosts = await this.userRepository.getPosts(userId)

        if (!userWithPosts) throw new UserNotFoundException(userId)

        const userPostsDtos = this.postMapper.toTitleDto(userWithPosts.posts)
        const userWithPostsDto = this.userMapper.toUserPostsDto(userWithPosts, userPostsDtos)

        return userWithPostsDto
    }
}