import { CommentWithAuthorDto } from "src/domain/comment/dto/comment-with-author.dto"

export type PostWithCommentsDto = Readonly<{
    id: number,
    title: string,
    text: string,
    comments: CommentWithAuthorDto[]
}>