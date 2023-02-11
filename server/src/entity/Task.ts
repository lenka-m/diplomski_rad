import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Team } from "./Team";


@Entity({name: "tasks"})
export class Task {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Team, team => team.tasks)
    team: Team;

    @Column()
    name: string;

    @Column()
    points: number;

    @Column()
    visible:boolean;
}