import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import {Activity} from "../entity/Activity";
import { Team } from "../entity/Team";
import { Project } from "../entity/Project";
import { User } from "../entity/User";
import { Task } from "../entity/Task";
import { Brackets } from "typeorm";
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
   const userConfirmed = await AppDataSource.getRepository(User).findOne({where: {id: req.body.data.userConfirmedId}});
   const activityId = req.body.data.activityId;
   console.log(req.body.data);
   await AppDataSource.getRepository(Activity).update(
      { id: activityId },
      {
        confirmation: true,
        numOfPoints: req.body.data.numOfPoints,
        userConfirmed: userConfirmed,
        status: "pending"
      }
    );
   res.send('ok');
}

export async function finalUpdateActivity(req: Request, res: Response) {
   const activityId = req.body.data.activityId;
   const numOfPoints = req.body.data.numOfPoints;
 
   try {
     // Find the activity by ID and update its properties
     const activity = await AppDataSource.getRepository(Activity).findOne({
      where: { id: activityId },
      relations: ['user'],
    });
    
     activity.numOfPoints = numOfPoints;
     activity.status = 'completed';
     activity.confirmation = true;
 
     await AppDataSource.getRepository(Activity).save(activity);
 
     // Calculate the total points for the user's completed activities
     const user = activity.user;
     const completedActivities = await AppDataSource.getRepository(Activity).find({
       where: {
         user,
         status: 'completed',
       },
     });
     const totalPoints = completedActivities.reduce((acc, cur) => acc + cur.numOfPoints, 0);
 
     // Update the user's totalPoints field
     user.totalPoints = totalPoints;
     await AppDataSource.getRepository(User).save(user);
 
     res.send('ok');
   } catch (error) {
     console.error(error);
     res.status(500).send('Error updating activity');
   }
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
   console.log(`Zahtev za search: ${req.query}`);
   const userId = req.query.userId;
   const date = req.query.date;
   const confirmation = req.query.confirmation;
   const numOfPoints = req.query.numOfPoints;
   const status = req.query.status;
   const projectId = req.query.projectId;
   const userConfirmedId = req.query.UserActions;
   const teamId = req.query.teamId;
   const taskId = req.query.taskId;
   const coordinatorId = req.query.coordinatorId;
   const userRole = req.query.userRole;
   console.log(coordinatorId);
      const query = AppDataSource.getRepository(Activity)
      .createQueryBuilder("activity")
      .leftJoinAndSelect("activity.user", "user")
      .leftJoinAndSelect("activity.task","task")
      .leftJoinAndSelect("activity.project", "project")
      .leftJoinAndSelect("activity.userConfirmed","userConfirmed")
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
      if(userRole === 'none'){
         query.andWhere("activity.status = 'complete'");
         query.andWhere("activity.id = : userId")
      } else if (userRole==='editor' && coordinatorId) {
         query.andWhere("activity.status != :status", { status: 'completed' });
         query.andWhere(
            new Brackets((qb) => {
            qb.where("projectCoordinator.id = :coordinatorId", {
            coordinatorId: coordinatorId,
             }).orWhere("teamCoordinator.id = :coordinatorId", {
               coordinatorId: coordinatorId,
            });
    })
  );
      } else if (userRole==='admin'){
         query.andWhere("activity.status != :status", { status: 'completed' });
      }     
  
      const activities = await query.getMany();
      console.log(activities);
      console.log(req.query);
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
     res.status(500).json({ message: 'Failed to delete activity' });
   }
}