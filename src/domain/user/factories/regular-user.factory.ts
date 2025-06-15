import { Injectable } from "@nestjs/common";
import { IUserFactory } from "../user.factory.interface";
import { CreateUserDto } from "../dto/create-user.dto";
import { User } from "../user.entity";

@Injectable()
export class RegularUserFactory implements IUserFactory {
    createFromDto(dto: CreateUserDto): User {
        const user = new User()

        Object.assign(user, dto)

        return user
    }

}