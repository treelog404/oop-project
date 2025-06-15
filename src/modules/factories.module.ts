import { Global, Module } from "@nestjs/common";
import { RegularCommentFactory } from "src/domain/comment/factories/regular-comment.factory";
import { RegularPostFactory } from "src/domain/post/factories/regular-post.factory";
import { RegularUserFactory } from "src/domain/user/factories/regular-user.factory";

@Global()
@Module({
    providers: [
        RegularCommentFactory,
        RegularPostFactory,
        RegularUserFactory
    ],
    exports: [
        RegularCommentFactory,
        RegularPostFactory,
        RegularUserFactory
    ]
})
export class FactoriesModule {}