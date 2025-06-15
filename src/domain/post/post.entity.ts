import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm"
import { User } from "../user/user.entity"
import { Comment } from "../comment/comment.entity"

@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number
    @Column()
    title: string
    @Column()
    text: string
    @ManyToOne(() => User, user => user.posts)
    author: User
    @OneToMany(() => Comment, comment => comment.post)
    comments: Comment[]
}