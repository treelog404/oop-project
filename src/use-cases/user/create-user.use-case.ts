import { Inject, Injectable } from "@nestjs/common";
import { CreateUserDto } from "src/domain/user/dto/create-user.dto";
import { RegularUserFactory } from "src/domain/user/factories/regular-user.factory";
import { UserMapper } from "src/domain/user/mappers/user.mapper";
import { User } from "src/domain/user/user.entity";
import { IUserRepository } from "src/domain/user/user.repository.interface";

@Injectable()
export class CreateUserUseCase {
    constructor(
        @Inject(IUserRepository)
        private readonly userRepository: IUserRepository,
        @Inject()
        private readonly userFactory: RegularUserFactory,
        @Inject()
        private readonly userMapper: UserMapper
    ) {}

    async execute(userData: CreateUserDto) {
        const user = this.userFactory.createFromDto(userData)

        const savedUser = await this.userRepository.save(user)
        const userDto = this.userMapper.toDto(savedUser)
        return userDto
    }
}