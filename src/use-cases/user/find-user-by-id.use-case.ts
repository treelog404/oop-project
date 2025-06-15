import { Inject, Injectable } from "@nestjs/common";
import { UserNotFoundException } from "src/domain/user/exceptions/user-not-found.exception";
import { UserMapper } from "src/domain/user/mappers/user.mapper";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class FindUserByIdUseCase {
    constructor(
        @Inject(IUserRepository) 
        private readonly userRepository: IUserRepository,
        @Inject()
        private readonly userMapper: UserMapper
    ) {}

    async execute(userId: number) {
        const user = await this.userRepository.findById(userId)

        if (!user) throw new UserNotFoundException(userId)

        const userDto = this.userMapper.toDto(user)

        return userDto
    }
}