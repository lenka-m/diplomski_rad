import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToOne } from "typeorm"
import { User } from "./User";
import { Team } from "./Team";
import { Project } from "./Project";

@Entity({name: "calls"})
export class Call {

    @PrimaryGeneratedColumn()
    id: number

    @Column()
    header: string;

    @ManyToOne(()=>User)
    postedBy: User;

    @Column({ type: 'date' })
    startDate: Date;

    @Column({ type: 'date' })
    endDate: Date;

    @Column()
    status: string;

    @Column({ type: 'varchar', length: 255 })
    applyLink: string;

    @ManyToOne(() => Team, {nullable: true})
    team: Team;

    @ManyToOne(() => Project, {nullable: true})
    project: Project;

}
