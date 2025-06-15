import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/domain/user/user.repository.interface";
import { Repository } from "typeorm";

@Injectable()
export class UserRepository implements IUserRepository {
    constructor(
        @InjectRepository(User)
        private readonly repo: Repository<User>
    ) {}

    async findById(id: number): Promise<User | null> {
        const user = await this.repo.findOneBy({ id })
        return user
    }

    async save(user: User): Promise<User> {
        const newUser = await this.repo.save(user)
        return newUser
    }

    async get(limit?: number): Promise<User[]> {
        const users = await this.repo.find({ take: limit })
        return users
    }

    async delete(id: number): Promise<User | null> {
        const deletedUser = await this.repo.findOneBy({ id })
        this.repo.delete(id)

        return deletedUser
    }

    async getPosts(userId: number): Promise<User | null> {
        const user = await this.repo.findOne({
            where: { id: userId },
            relations: ['posts']
        })

        return user
    }
}