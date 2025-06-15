import { Injectable } from "@nestjs/common";
import { GetUserDto } from "../dto/get-user.dto";
import { User } from "../user.entity";
import { GetUserPostsDto } from "../dto/get-user-posts.dto";
import { PostTitleDto } from "src/domain/post/dto/post-title.dto";

@Injectable()
export class UserMapper {

    toDto(user: User): GetUserDto
    toDto(user: User[]): GetUserDto[]

    toDto(data: User | User[]): GetUserDto | GetUserDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(user => this.mapUserToDto(user))

        return this.mapUserToDto(data)
    }

    toUserPostsDto(user: User, mappedPosts: PostTitleDto[]): GetUserPostsDto
    toUserPostsDto(users: User[], mappedPosts: PostTitleDto[][]): GetUserPostsDto[]

    toUserPostsDto(
        userData: User | User[],
        postsData: PostTitleDto[] | PostTitleDto[][]
    ): GetUserPostsDto | GetUserPostsDto[] {
        if (!userData) return []

        if (Array.isArray(userData)) {
            return userData.map((user, idx) => 
                this.mapToUserPostsDto(user, (postsData as PostTitleDto[][])[idx]))
        }

        return this.mapToUserPostsDto(userData, postsData as PostTitleDto[])
    }

    private mapUserToDto(user: User): GetUserDto {
        return {
            id: user.id,
            firstName: user.firstName,
            lastName: user.lastName
        }
    }

    private mapToUserPostsDto(user: User, mappedPosts: PostTitleDto[]): GetUserPostsDto {
        return {
            id: user.id,
            userName: `${user.lastName} ${user.firstName}`,
            posts: mappedPosts
        }
    }
}