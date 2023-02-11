import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { User } from "./User";


@Entity({name: "teams"})
export class Team {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;

    @ManyToOne(()=>User)
    coordinator: User;
    
}