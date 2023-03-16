import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, Index } from "typeorm"
import { User } from "./User";
import { Task } from "./Task";

@Entity({name: "teams"})
export class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Index({ unique: true })
    @Column()
    name: string;

    @ManyToOne(()=>User)
    coordinator: User;

    @OneToMany(()=> Task, task=> task.team, { onDelete: "CASCADE" })
    tasks: Task[]
    
}