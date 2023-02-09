import internal = require("stream");
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";
import {Project} from "./Project"
import { Area } from "./Area";
import { SubArea } from "./SubArea";

@Entity({name: "activities"})
export class Activity {

    @PrimaryGeneratedColumn()
    id: number

    @ManyToOne(()=> User)
    user: User;

    @Column({ type: 'date' })
    date: Date;

    @ManyToOne(()=> Project)
    project: Project;

    @ManyToOne(()=> Area)
    area:Area;

    @ManyToOne(()=> SubArea)
    subarea:Area;

    @Column()
    confirmation: boolean;

    @ManyToOne(()=>User)
    userConfirmed: User;
    
    @Column({nullable:true})
    numOfPoints: number;
    
    @Column({nullable:true})
    status: string;
   

}
