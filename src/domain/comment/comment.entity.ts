import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "../post/post.entity"
import { User } from "../user/user.entity"

@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    text: string
    @ManyToOne(() => User, user => user.comments)
    author: User
    @ManyToOne(() => Post, post => post.comments)
    post: Post
}