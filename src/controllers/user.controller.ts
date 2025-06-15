import { Body, Controller, Delete, Get, Inject, Param, Post, Put, Query } from "@nestjs/common";
import { CreateUserDto } from "src/domain/user/dto/create-user.dto";
import { User } from "src/domain/user/user.entity";
import { CreateUserUseCase } from "src/use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "src/use-cases/user/delete-user.use-case";
import { FindUserByIdUseCase } from "src/use-cases/user/find-user-by-id.use-case";
import { GetUserPostsUseCase } from "src/use-cases/user/get-user-posts.use-case";
import { GetUserUseCase } from "src/use-cases/user/get-user.use-case";
import { UpdateUserUseCase } from "src/use-cases/user/update-user.use-case";

@Controller('users')
export class UserController {
    constructor(
        private readonly createUserUseCase: CreateUserUseCase,
        private readonly updateUserUseCase: UpdateUserUseCase,
        private readonly getUsersUseCase: GetUserUseCase,
        private readonly findUserByIdUseCase: FindUserByIdUseCase,
        private readonly deleteUserUseCase: DeleteUserUseCase,
        private readonly getUserPostsUseCase: GetUserPostsUseCase
    ) {}

    @Get()
    async getUsers(@Query('limit') limit?: number) {
        return await this.getUsersUseCase.execute(limit)
    }

    @Get(':id')
    async findById(@Param('id') userId: number) {
        return await this.findUserByIdUseCase.execute(userId)
    }

    @Get(':id/posts')
    async getUserPosts(@Param('id') userId: number) {
        return await this.getUserPostsUseCase.execute(userId)
    }

    @Post()
    async createUser(@Body() userData: CreateUserDto) {
        return await this.createUserUseCase.execute(userData)
    }

    @Put(':id')
    async updateUser(@Param('id') userId: number, @Body() userData: User) {
        return await this.updateUserUseCase.execute(userId, userData)
    }

    @Delete(':id')
    async deleteUser(@Param('id') userId: number) {
        return await this.deleteUserUseCase.execute(userId)
    }
}