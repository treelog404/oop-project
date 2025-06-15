import { Comment } from "./comment.entity";

export interface ICommentRepository {
    findById(id: number): Promise<Comment | null>
    save(comment: Comment): Promise<Comment>
    get(limit?: number): Promise<Comment[]>
    delete(id: number): Promise<Comment | null>
}

export const ICommentRepository = Symbol("ICommentRepository")