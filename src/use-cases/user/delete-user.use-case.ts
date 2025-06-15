import { Inject, Injectable } from "@nestjs/common";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class DeleteUserUseCase {
    constructor(@Inject(IUserRepository) private readonly userRepository: IUserRepository) {}

    async execute(userId: number) {
        const deletedUser = this.userRepository.delete(userId)
        return deletedUser
    }
}