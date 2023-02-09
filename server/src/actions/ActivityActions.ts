import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import {Activity} from "../entity/Activity";
import { Area } from "../entity/Area";
import { Project } from "../entity/Project";
import { SubArea } from "../entity/SubArea";
import { User } from "../entity/User";

export async function createActivity(req:Request, res:Response){
    console.log(req.body);
    const user = await AppDataSource.getRepository(User).findOne({where: {id: req.body.userId}});
    const project = await AppDataSource.getRepository(Project).findOne({where: {id: req.body.projectId}})
    const area = await AppDataSource.getRepository(Area).findOne({where: {id: req.body.areaId}})    
    const subarea = await AppDataSource.getRepository(SubArea).findOne({where: {id: req.body.subareaId}})
    
    const activity = await AppDataSource.getRepository(Activity).save({         
       user: user,
       date: req.body.date,
       project: project,
       area:area,
       subarea:subarea,
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
         area: true,
         subarea:true,
         user: true,
         userConfirmed:true
       }
   })
   res.json(activities);
}

