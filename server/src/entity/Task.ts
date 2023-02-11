import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Team } from "./Team";


@Entity({name: "tasks"})
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Team)
    team: Team;

    @Column()
    name: string;
}