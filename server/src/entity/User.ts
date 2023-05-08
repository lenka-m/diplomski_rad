import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm"
import {EncryptionTransformer} from "typeorm-encrypted";
import { Activity } from "./Activity";


@Entity({name: "users"})
export class User {

    @PrimaryGeneratedColumn()
    id: number

    @Column({unique:true})
    email: string

    @Column({
        type: "varchar",
        nullable: false,
        transformer: new EncryptionTransformer({
          key: 'e41c966f21f9e1577802463f8924e6a3fe3e9751f201304213b2f845d8841d61',
          algorithm: 'aes-256-cbc',
          ivLength: 16,
          iv: 'ff5ac19190424b1d88f9419ef949ae56'
        })
      })
    password: string; 

    @Column()
    firstName: string

    @Column()
    lastName: string

    @Column()
    telephoneNumber: string

    @Column({ nullable: true })
    profilePictureURL?: string;

    // Moguce vrednosti: admin, editor, none
    @Column()
    userRole: string

    // Ako je editor:
    @Column({ nullable: true })
    userRoleName: string
    
    // Ako je none: 
    @Column({ nullable: true, type: 'date' })
    birthday: Date

    // Ako je none: 
    @Column({ nullable: true })
    dateOfMembership: string

    // Ako je none: 
    @Column({ nullable: true })
    lastLogin: Date

    // Ako je none:
    @Column({ nullable: true })
    userStatus: string

    // Ako je none:
    @Column({ nullable: true })
    totalPoints: number;

    // Ako je none:
    @Column({ nullable: true })
    startingPoints: number;
    
    // Ako je none:
    @OneToMany(()=> Activity, activity=> activity.user, { onDelete: "CASCADE" })
    activities: Activity[]
}