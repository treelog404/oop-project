import { Post } from "./post.entity";

export interface IPostRepository {
    findById(id: number): Promise<Post | null>
    save(post: Post): Promise<Post>
    get(limit?: number): Promise<Post[]>
    delete(id: number): Promise<Post | null>
    getComments(postId: number): Promise<Post | null>
}

export const IPostRepository = Symbol("IPostRepository")