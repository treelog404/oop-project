import { Body, Controller, Delete, Get, Param, Post, Put, Query } from "@nestjs/common";
import { CreatePostDto } from "src/domain/post/dto/create-post.dto";
import { UpdatePostDto } from "src/domain/post/dto/update-post.dto";
import { CreatePostUseCase } from "src/use-cases/post/create-post.use-case";
import { DeletePostUseCase } from "src/use-cases/post/delete-post.use-case";
import { FindPostByIdUseCase } from "src/use-cases/post/find-post-by-id.use-case";
import { GetPostCommentsUseCase } from "src/use-cases/post/get-post-comments.use-case";
import { GetPostsUseCase } from "src/use-cases/post/get-posts.use-case";
import { UpdatePostUseCase } from "src/use-cases/post/update-post.use-case";

@Controller('posts')
export class PostController {
    constructor(
        private readonly createPostUseCase: CreatePostUseCase,
        private readonly updatePostUseCase: UpdatePostUseCase,
        private readonly deletePostUseCase: DeletePostUseCase,
        private readonly findPostByIdUseCase: FindPostByIdUseCase,
        private readonly getPostsUseCase: GetPostsUseCase,
        private readonly getPostCommentsUseCase: GetPostCommentsUseCase
    ) {}

    @Get()
    async getAllPosts(@Query('limit') limit?: number) {
        return await this.getPostsUseCase.execute(limit)
    }

    @Get(':id')
    async findPostById(@Param('id') postId: number) {
        return await this.findPostByIdUseCase.execute(postId)
    }

    @Get(':id/comments')
    async getPostComments(@Param('id') postId: number) {
        return await this.getPostCommentsUseCase.execute(postId)
    }

    @Post()
    async createPost(@Body() postData: CreatePostDto) {
        return await this.createPostUseCase.execute(postData)
    }

    @Put()
    async updatePost(@Body() postData: UpdatePostDto) {
        return await this.updatePostUseCase.execute(postData)
    }

    @Delete(':id')
    async deletePost(@Param('id') postId: number) {
        return await this.deletePostUseCase.execute(postId)
    }
}