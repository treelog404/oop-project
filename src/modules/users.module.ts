import { Module } from "@nestjs/common";
import { UserController } from "src/controllers/user.controller";
import { CreateUserUseCase } from "src/use-cases/user/create-user.use-case";
import { DeleteUserUseCase } from "src/use-cases/user/delete-user.use-case";
import { FindUserByIdUseCase } from "src/use-cases/user/find-user-by-id.use-case";
import { GetUserPostsUseCase } from "src/use-cases/user/get-user-posts.use-case";
import { GetUserUseCase } from "src/use-cases/user/get-user.use-case";
import { UpdateUserUseCase } from "src/use-cases/user/update-user.use-case";

@Module({
    controllers: [UserController],
    providers: [
        CreateUserUseCase,
        GetUserUseCase,
        UpdateUserUseCase,
        FindUserByIdUseCase,
        DeleteUserUseCase,
        GetUserPostsUseCase,
    ]
})
export class UsersModule {}