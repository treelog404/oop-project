import { CreateCommentDto } from "./dto/create-comment.dto";

export interface ICommentFactory {
    createCommentFromDto(dto: CreateCommentDto)
}