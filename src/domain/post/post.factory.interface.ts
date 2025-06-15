import { CreatePostDto } from "./dto/create-post.dto";

export interface IPostFactory {
    createPostFromDto(dto: CreatePostDto)
}