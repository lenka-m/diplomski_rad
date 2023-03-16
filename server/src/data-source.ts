import "reflect-metadata"
import { DataSource } from "typeorm"
import { Activity } from "./entity/Activity"
import { Project } from "./entity/Project"
import { Team } from "./entity/Team"
import { Task } from "./entity/Task"
import { User } from "./entity/User"
import { Call } from "./entity/Call"

export const AppDataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "root",
    database: "spc",
    logging: false,
    entities: [User, Project, Team, Task, Activity, Call],
    migrations: ["src/migration/*"],
    synchronize:true
})
