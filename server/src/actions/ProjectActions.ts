import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {Project} from "../entity/Project";


export async function getAllProjects(req: Request, res:Response){
    const projects= await AppDataSource.getRepository(Project).find();
    console.log(projects);
    res.json(projects);
}

export async function insertNewProject(req:Request, res:Response){
    console.log(req.body);
        const project = await AppDataSource.getRepository(Project).save({
            name: req.body.name,
            short: req.body.short,
            website: req.body.website,
            visible: req.body.visible

        })
        res.json(project)
}