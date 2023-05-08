import internal = require("stream");
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import {Project} from "./Project"
import { Team } from "./Team";
import { Task } from "./Task";


@Entity({name: "activities"})
export class Activity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User, user=>user.activities)
    user: User;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(()=> Project)
    project: Project;

    @ManyToOne(()=> Team)
    team:Team;

    @ManyToOne(()=> Task)
    task:Task;

    @Column()
    confirmation: boolean;

    @ManyToOne(()=>User)
    userConfirmed: User;
    
    @Column({nullable:true})
    numOfPoints: number;
    
    @Column({nullable:true})
    status: string;

    @Column({ nullable: true })
    description: string;
   

}
