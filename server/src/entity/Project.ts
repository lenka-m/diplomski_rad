import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


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
}
