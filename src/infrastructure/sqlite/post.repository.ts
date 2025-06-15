import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Post } from "src/domain/post/post.entity";
import { IPostRepository } from "src/domain/post/post.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class PostRepository implements IPostRepository {
    constructor(
        @InjectRepository(Post)
        private readonly repo: Repository<Post>
    ) {}

    async findById(id: number): Promise<Post | null> {
        const post = await this.repo.findOne({
            where: { id },
            relations: ['author']
        })

        return post
    }

    async save(post: Post): Promise<Post> {
        const newPost = await this.repo.save(post)
        return newPost
    }

    async get(limit?: number): Promise<Post[]> {
        const posts = await this.repo.find({ take: limit, relations: ['author'] })
        return posts
    }

    async update(post: Post): Promise<Post | null> {
        const updatedPost = this.repo.save(post)
        return updatedPost
    }

    async delete(id: number): Promise<Post | null> {
        const post = await this.repo.findOne({
            select: { id: true, title: true },
            where: { id }
        })

        if (!post) return null

        this.repo.delete(id)

        return post
    }

    async getComments(postId: number): Promise<Post | null> {
        const post = await this.repo.findOne({
            where: { id: postId },
            relations: ['comments', 'comments.author']
        })

        return post
    }
}