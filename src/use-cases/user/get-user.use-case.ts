import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class GetUserUseCase {
    constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    async execute(limit?: number) {
        const users = await this.userRepository.get(limit)
        return users
    }
}