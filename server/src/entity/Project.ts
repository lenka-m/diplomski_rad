import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity({name: "projects"})
export class Project {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    name: string;
}
