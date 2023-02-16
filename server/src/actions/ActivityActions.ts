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

export async function searchActivities(req: Request, res:Response){
      const userId = req.body.userId;
      const date = req.body.date;
      const confirmation = req.body.confirmation;
      const numOfPoints = req.body.numOfPoints;
      const status = req.body.status;
      const projectId = req.body.projectId;
      const userConfirmedId = req.body.UserActions;    
      const teamId = req.body.teamId;
      const taskId = req.body.taskId;
      const coordinatorId = req.body.coordinatorId;
      console.log(coordinatorId);

      const query = AppDataSource.getRepository(Activity)
      .createQueryBuilder("activity")
      .leftJoinAndSelect("activity.user", "user")
      .leftJoinAndSelect("activity.project", "project")
      .leftJoinAndSelect("activity.team", "team")
      .leftJoinAndSelect("project.coordinator", "projectCoordinator")
      .leftJoinAndSelect("team.coordinator", "teamCoordinator");
  
      if (userId) {
          query.andWhere("activity.userId = :userId", { userId: userId });
      }
      if(date){
         query.andWhere("activity.date = :date", {date:date});
      }
  
      if (confirmation) {
          query.andWhere("activity.confirmation = :confirmation", { confirmation: confirmation });
      }
      if (numOfPoints) {
         query.andWhere("activity.numOfPoints = :numOfPoints", { numOfPoints: numOfPoints });
      }
      if (status) {
         query.andWhere("activity.status = :status", { status: status });
      }
      if (projectId) {
         query.andWhere("activity.projectId = :projectId", { projectId: projectId });
      }
      if (userConfirmedId) {
         query.andWhere("activity.userConfirmedId = :userConfirmedId", { userConfirmedId: userConfirmedId });
      }
      if (teamId) {
         query.andWhere("activity.teamId = :teamId", { teamId: teamId });
      }
      if (taskId) {
         query.andWhere("activity.taskId = :taskId", { taskId: taskId });
      }  
      if (coordinatorId) {
         query.orWhere("projectCoordinator.id = :coordinatorId", { coordinatorId: coordinatorId });
         query.orWhere("teamCoordinator.id = :coordinatorId", {coordinatorId : coordinatorId});
      }      
  
      const activities = await query.getMany();
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