import { Inject, Injectable } from "@nestjs/common";
import { GetUserDto } from "src/domain/user/dto/get-user.dto";
import { UserNotFoundException } from "src/domain/user/exceptions/user-not-found.exception";
import { UserMapper } from "src/domain/user/mappers/user.mapper";
import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class UpdateUserUseCase {
    constructor(
        @Inject(IUserRepository) 
        private readonly userRepository: IUserRepository,
        @Inject()
        private readonly userMapper: UserMapper
    ) {}

    async execute(userId: number, userData: User): Promise<GetUserDto | null> {
        const user = await this.userRepository.findById(userId)

        if (!user) throw new UserNotFoundException(userId)

        Object.assign(user, userData)

        const updatedUser = await this.userRepository.save(user)

        const userDto = this.userMapper.toDto(updatedUser)

        return userDto
    }
}