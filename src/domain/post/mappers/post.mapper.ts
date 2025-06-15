import { Injectable } from "@nestjs/common";
import { GetPostDto } from "../dto/get-post.dto";
import { Post } from "../post.entity";
import { DeletePostDto } from "../dto/delete-post.dto";
import { PostTitleDto } from "../dto/post-title.dto";
import { PostWithCommentsDto } from "../dto/post-with-comments.dto";
import { CommentWithAuthorDto } from "src/domain/comment/dto/comment-with-author.dto";

@Injectable()
export class PostMapper {
    toDto(post: Post): GetPostDto
    toDto(posts: Post[]): GetPostDto[]

    toDto(data: Post | Post[]): GetPostDto | GetPostDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(post => this.mapPostToDto(post))

        return this.mapPostToDto(data)
    }

    toDeleteDto(post: Post): DeletePostDto
    toDeleteDto(posts: Post[]): DeletePostDto[]

    toDeleteDto(data: Post | Post[]): DeletePostDto | DeletePostDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(post => this.mapPostToDeleteDto(post))

        return this.mapPostToDeleteDto(data)
    }

    toTitleDto(post: Post): PostTitleDto
    toTitleDto(posts: Post[]): PostTitleDto[]

    toTitleDto(data: Post | Post[]): PostTitleDto | PostTitleDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(post => this.mapPostToTitleDto(post))

        return this.mapPostToTitleDto(data)
    }

    toWithCommentsDto(post: Post, mappedComments: CommentWithAuthorDto[]): PostWithCommentsDto
    toWithCommentsDto(posts: Post[], mappedComments: CommentWithAuthorDto[][]): PostWithCommentsDto[]

    toWithCommentsDto(
        postData: Post | Post[],
        commentsData: CommentWithAuthorDto[] | CommentWithAuthorDto[][]
    ): PostWithCommentsDto | PostWithCommentsDto[] {

        if (!postData || !commentsData) return []

        if (Array.isArray(postData)) {
            return postData.map((post, idx) => this.mapToWithCommentsDto(
                post, 
                (commentsData as CommentWithAuthorDto[][])[idx]
            ))
        }

        return this.mapToWithCommentsDto(postData, commentsData as CommentWithAuthorDto[])
    }

    private mapPostToDto(post: Post): GetPostDto {
        return {
            id: post.id,
            title: post.title,
            text: post.text,
            authorName: `${post.author.lastName} ${post.author.firstName}`
        }
    }

    private mapPostToDeleteDto(post: Post): DeletePostDto {
        return {
            id: post.id,
            title: post.title
        }
    }

    private mapPostToTitleDto(post: Post): PostTitleDto {
        return {
            id: post.id,
            title: post.title
        }
    }

    private mapToWithCommentsDto(
        post: Post, 
        mappedComments: CommentWithAuthorDto[]
    ): PostWithCommentsDto {
        return {
            id: post.id,
            title: post.title,
            text: post.text,
            comments: mappedComments
        }
    }
}