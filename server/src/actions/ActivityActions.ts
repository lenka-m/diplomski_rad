import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import {Activity} from "../entity/Activity";
import { Team } from "../entity/Team";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { Task } from "../entity/Task";

export async function createActivity(req:Request, res:Response){
    console.log(req.body);
    const user = await AppDataSource.getRepository(User).findOne({where: {id: req.body.userId}});
    const project = await AppDataSource.getRepository(Project).findOne({where: {id: req.body.projectId}})
    const team = await AppDataSource.getRepository(Team).findOne({where: {id: req.body.teamId}})    
    const task = await AppDataSource.getRepository(Task).findOne({where: {id: req.body.taskId}})
    
    const activity = await AppDataSource.getRepository(Activity).save({         
       user: user,
       date: req.body.date,
       project: project,
       team:team,
       task:task,
       status: "created",
       confirmation: false
    })
   res.json(activity);
}

export async function updateActivity(req:Request, res:Response){
   const userConfirmed = await AppDataSource.getRepository(User).findOne({where: {id: req.body.userConfirmedId}});
   const activityId = req.body.activityId;
   console.log(req.body);
   await AppDataSource.getRepository(Activity).update(activityId, {
      confirmation: true,
      numOfPoints: req.body.numOfPoints,
      userConfirmed: userConfirmed,
      status: "pending"
   })
   res.send('ok');
}

export async function finalUpdateActivity(req:Request, res:Response){
   
   const activityId = req.body.activityId;

   await AppDataSource.getRepository(Activity).update(activityId, {
      numOfPoints: req.body.numOfPoints,
      status: "complete"
   })
}

export async function getAllActivities(req: Request, res:Response){
   const activities = await AppDataSource.getRepository(Activity).find({
         relations: {
         project:true,
         team: true,
         task:true,
         user: true,
         userConfirmed:true
       }
   })
   res.json(activities);
}

export async function deleteActivity(req:Request, res:Response){
   try {
       console.log(`pozvanan funkcija + ${req.body.activityId}`);
       const activity = await AppDataSource.getRepository(Activity).delete({
       id:req.body.activityId
     });

     
     res.json(activity);
   } catch (error) {
     console.error(error);
     res.status(500).json({ message: 'Failed to delete user' });
   }
}