import "reflect-metadata"
import { DataSource } from "typeorm"
import { Activity } from "./entity/Activity"
import { Area } from "./entity/Area"
import { Project } from "./entity/Project"
import { SubArea } from "./entity/SubArea"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "spc",
    logging: false,
    entities: [User, Project, Area, SubArea, Activity],
    migrations: ["src/migration/*"],
    synchronize:true
})
