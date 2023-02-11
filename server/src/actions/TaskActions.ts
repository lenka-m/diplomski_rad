import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import { Team } from "../entity/Team";
import { Task } from "../entity/Task";



export async function getAllTasks(req: Request, res:Response){
    const tasks = await AppDataSource.getRepository(Task).find({
        relations: {
            team: true
        }
    })
    res.json(tasks);
}

export async function postNewTask(req:Request, res:Response){
     console.log(req.body);
     const team = await AppDataSource.getRepository(Task).findOne({where: {id: req.body.teamId}});
     //console.log(team);
     const task = await AppDataSource.getRepository(Task).save({         
        name: req.body.name,
        team: team
     })
    res.json(team);
}