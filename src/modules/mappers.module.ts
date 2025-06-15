import { Global, Module } from "@nestjs/common";
import { CommentMapper } from "src/domain/comment/mappers/comment.mapper";
import { PostMapper } from "src/domain/post/mappers/post.mapper";
import { UserMapper } from "src/domain/user/mappers/user.mapper";

@Global()
@Module({
    providers: [
        PostMapper,
        CommentMapper,
        UserMapper
    ],
    exports: [
        PostMapper,
        CommentMapper,
        UserMapper
    ]
})
export class MappersModule {}