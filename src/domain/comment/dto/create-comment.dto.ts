export type CreateCommentDto = Readonly<{
    text: string
    authorId: number
    postId: number
}>