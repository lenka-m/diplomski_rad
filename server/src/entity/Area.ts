import { Entity, PrimaryGeneratedColumn, Column } from "typeorm"


@Entity({name: "areas"})
export class Area {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    name: string;
}