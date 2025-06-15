import { PostTitleDto } from "src/domain/post/dto/post-title.dto"

export type GetUserPostsDto = Readonly<{
    id: number
    userName: string
    posts: PostTitleDto[]
}>