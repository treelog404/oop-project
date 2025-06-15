import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

export interface IUserFactory {
    createFromDto(dto: CreateUserDto): User
}