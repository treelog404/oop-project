import { Injectable, NotImplementedException } from "@nestjs/common";
import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class UserRepository implements IUserRepository {
    private users: User[] = []
    
    async findById(id: number): Promise<User | null> {
        return this.users.find(u => u.id == id) || null
    }

    async save(user: User): Promise<User> {
        this.users.push(user)
        return user
    }

    async get(limit?: number): Promise<User[]> {
        return limit === undefined ?
            this.users :
            this.users.slice(0, limit)
    }

    async update(id: number, user: User): Promise<User | null> {
        const userToUpdate = this.users.find(u => u.id == id) || null

        if (userToUpdate)
            Object.assign(userToUpdate, user)

        return userToUpdate
    }

    async delete(id: number): Promise<User | null> {
        const deleteUser = this.users.find(u => u.id == id) || null
        const deleteUserIndex = deleteUser != null ?
            this.users.indexOf(deleteUser) :
            -1

        this.users.splice(deleteUserIndex, 1)

        return deleteUser
    }

    async getPosts(userId: number): Promise<User | null> {
        throw new NotImplementedException('Not implemented')
    }
}