import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany, ManyToOne } from "typeorm"
import { User } from "./User";


@Entity({name: "projects"})
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    name: string;

    @Column({unique:true})
    short: string;

    @Column()
    website: string;

    @Column()
    visible: boolean;

    @ManyToOne(()=> User)
    coordinator: User;
}
