import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm"
import { Area } from "./Area";


@Entity({name: "subareas"})
export class SubArea {

    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(()=>Area)
    area: Area;

    @Column()
    name: string;
}