import { User } from "./user.entity";

export interface IUserRepository {
    findById(id: number): Promise<User | null>
    save(user: User): Promise<User>
    get(limit?: number): Promise<User[]>
    delete(id: number): Promise<User | null>
    getPosts(userId: number): Promise<User | null>
}

export const IUserRepository = Symbol("IUserRepository")