import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import { Team } from "../entity/Team";
import { User } from "../entity/User";

export async function getAllTeams(req: Request, res:Response) {
  const teamRepository = AppDataSource.getRepository(Team);
  const userRepository = AppDataSource.getRepository(User);
  const teams = await teamRepository
    .createQueryBuilder("team")
    .leftJoinAndSelect("team.tasks", "task")
    .leftJoinAndSelect("team.coordinator", "user")
    .getMany();
  console.log(teams);
  res.json(teams);
}



export async function searchTeams(req: Request, res:Response){
  const coordinatorId = req.query.coordinatorId;
  const query = AppDataSource.getRepository(Team)
    .createQueryBuilder("team")
      .leftJoinAndSelect("team.tasks", "task");

  if (coordinatorId) {
      query.andWhere("team.coordinatorId = :coordinatorId", { coordinatorId: coordinatorId });
  }

  const teams = await query.getMany();
  res.json(teams);
}


export async function postNewTeam(req:Request, res:Response){
    console.log(req.body);
    const user = await AppDataSource.getRepository(User).findOne({where: {id: req.body.coordinatorId}});
        const team = await AppDataSource.getRepository(Team).save({
            name: req.body.name,
            coordinator:user
        })
        res.json(team)
}