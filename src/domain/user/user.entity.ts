import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { Post } from "../post/post.entity"
import { Comment } from "../comment/comment.entity"

@Entity()
export class User {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    firstName: string
    @Column()
    lastName: string
    @OneToMany(() => Post, post => post.author)
    posts: Post[]
    @OneToMany(() => Comment, comment => comment.author)
    comments: Comment[]
}