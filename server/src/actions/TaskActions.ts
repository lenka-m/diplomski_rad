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
     const team = await AppDataSource.getRepository(Team).findOne({where: {id: req.body.teamId}});
     //console.log(team);
     const task = await AppDataSource.getRepository(Task).save({         
        name: req.body.name,
        team: team,
        points: req.body.points,
        visible: true
     })
    res.json(task);
}
export async function searchTasks(req: Request, res:Response){
    const teamId = req.query.teamId;
    const query = AppDataSource.getRepository(Task)
      .createQueryBuilder("task")
  
    if (teamId) {
        query.andWhere("task.teamId = :teamId", { teamId: teamId });
    }
  
    const tasks = await query.getMany();
    res.json(tasks);
  }

  
export async function updateTaskVisibility(req: Request, res:Response){
    
   const taskId = req.body.data.taskId;
   await AppDataSource.getRepository(Task).update(
      { id: taskId },
      {
        visible: req.body.data.visible,
      }
    );
   res.send('ok');
}