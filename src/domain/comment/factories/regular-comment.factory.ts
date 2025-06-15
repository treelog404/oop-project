import { Injectable } from "@nestjs/common";
import { ICommentFactory } from "../comment.factory.interface";
import { CreateCommentDto } from "../dto/create-comment.dto";

@Injectable()
export class RegularCommentFactory implements ICommentFactory {
    createCommentFromDto(dto: CreateCommentDto) {
        const comment = new Comment()

        Object.assign(comment, dto)

        return comment
    }
}