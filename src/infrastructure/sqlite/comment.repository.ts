import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Comment } from "src/domain/comment/comment.entity";
import { ICommentRepository } from "src/domain/comment/comment.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class CommentRepository implements ICommentRepository {
    constructor(
        @InjectRepository(Comment)
        private readonly repo: Repository<Comment>
    ) {}

    async findById(id: number): Promise<Comment | null> {
        const comment = await this.repo.findOne({ 
            where: { id },
            relations: ['author', 'post']
        })

        return comment
    }

    async save(comment: Comment): Promise<Comment> {
        const savedComment = await this.repo.save(comment)
        return savedComment
    }

    async get(limit?: number): Promise<Comment[]> {
        const comments = await this.repo.find({ take: limit })
        return comments
    }

    async delete(id: number): Promise<Comment | null> {
        const comment = await this.repo.findOne({
            select: { id: true, text: true },
            where: { id }
        })

        if (!comment) return null

        await this.repo.delete(id)

        return comment
    }

}