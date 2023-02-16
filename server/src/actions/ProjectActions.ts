import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {Project} from "../entity/Project";
import { User } from "../entity/User";

export async function getAllProjects(req: Request, res:Response){
    const projectRepository = AppDataSource.getRepository(Project);
    const userRepository = await AppDataSource.getRepository(User);
    const projects= await projectRepository
        .createQueryBuilder('project')
        .leftJoinAndSelect('project.coordinator', 'user')
        .getMany();
        
    console.log(projects);
    res.json(projects);
}

export async function insertNewProject(req:Request, res:Response){
    console.log(req.body);
    const user = await AppDataSource.getRepository(User).findOne({where: {id: req.body.coordinatorId}});
        const project = await AppDataSource.getRepository(Project).save({
            name: req.body.name,
            short: req.body.short,
            website: req.body.website,
            visible: req.body.visible,
            coordinator:user
        })
        res.json(project)
}