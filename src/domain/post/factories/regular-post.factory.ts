import { Injectable } from "@nestjs/common";
import { IPostFactory } from "../post.factory.interface";
import { CreatePostDto } from "../dto/create-post.dto";
import { Post } from "../post.entity";

@Injectable()
export class RegularPostFactory implements IPostFactory {
    createPostFromDto(dto: CreatePostDto) {
        const post = new Post()

        Object.assign(post, dto)

        return post
    }
}