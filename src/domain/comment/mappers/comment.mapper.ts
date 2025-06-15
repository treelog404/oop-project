import { Injectable } from "@nestjs/common";
import { GetCommentDto } from "../dto/get-comment.dto";
import { Comment } from "../comment.entity"
import { DeleteCommentDto } from "../dto/delete-comment.dto";
import { combineLatest } from "rxjs";
import { CommentWithAuthorDto } from "../dto/comment-with-author.dto";

@Injectable()
export class CommentMapper {

    toDto(comment: Comment): GetCommentDto
    toDto(comments: Comment[]): GetCommentDto[]

    toDto(data: Comment | Comment[]): GetCommentDto | GetCommentDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(comment => this.mapCommentToDto(comment))

        return this.mapCommentToDto(data)
    }

    toDeleteDto(comment: Comment): DeleteCommentDto
    toDeleteDto(comment: Comment[]): DeleteCommentDto[]

    toDeleteDto(data: Comment | Comment[]): DeleteCommentDto | DeleteCommentDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(comment => this.mapCommentToDeleteDto(comment))

        return this.mapCommentToDeleteDto(data)
    }

    toWithAuthorDto(comment: Comment): CommentWithAuthorDto
    toWithAuthorDto(comments: Comment[]): CommentWithAuthorDto[]

    toWithAuthorDto(data: Comment | Comment[]): CommentWithAuthorDto | CommentWithAuthorDto[] {
        if (!data) return []

        if (Array.isArray(data))
            return data.map(comment => this.mapCommentToWithAuthorDto(comment))

        return this.mapCommentToWithAuthorDto(data)
    }

    private mapCommentToDto(comment: Comment): GetCommentDto {
        return {
            id: comment.id,
            text: comment.text,
            authorName: `${comment.author.lastName} ${comment.author.firstName}`,
            postTitle: comment.post.title
        }
    }

    private mapCommentToDeleteDto(comment: Comment): DeleteCommentDto {
        return {
            id: comment.id,
            text: comment.text
        }
    }

    private mapCommentToWithAuthorDto(comment: Comment): CommentWithAuthorDto {
        return {
            id: comment.id,
            text: comment.text,
            authorName: `${comment.author.lastName} ${comment.author.firstName}`
        }
    }
}