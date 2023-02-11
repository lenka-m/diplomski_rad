import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from "typeorm"
import { User } from "./User";
import { Task } from "./Task";

@Entity({name: "teams"})
export class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @ManyToOne(()=>User)
    coordinator: User;

    @OneToMany(()=> Task, task=> task.team)
    tasks: Task[]
    
}