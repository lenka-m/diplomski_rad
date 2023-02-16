import "reflect-metadata"
import { DataSource } from "typeorm"
import { Activity } from "./entity/Activity"
import { Project } from "./entity/Project"
import { Team } from "./entity/Team"
import { Task } from "./entity/Task"
import { User } from "./entity/User"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "spc",
    logging: false,
    entities: [User, Project, Team, Task, Activity],
    migrations: ["src/migration/*"],
    synchronize:true
})
