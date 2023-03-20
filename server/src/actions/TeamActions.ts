import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import { Team } from "../entity/Team";
import { User } from "../entity/User";
import { QueryFailedError } from "typeorm";

export async function searchTeams(req: Request, res:Response){
  const coordinator = req.query.coordinatorId;
  const query = AppDataSource.getRepository(Team)
    .createQueryBuilder("team")
      .leftJoinAndSelect("team.tasks", "task")
      .leftJoinAndSelect("team.coordinator","coordinator")
      .select([
        "team.id",
        "team.name",
        "coordinator.email",
        "task"
      ]).orderBy("task.visible", "DESC");;

  if (coordinator) {
      query.andWhere("team.coordinator= :coordinator", { coordinator: coordinator });
  }

  const teams = await query.getMany();
  res.json(teams);
}

export async function postNewTeam(req: Request, res: Response) {
  try {
    const user = await AppDataSource.getRepository(User).findOne({
      where: { id: req.body.coordinator },
    });
    const team = await AppDataSource.getRepository(Team).save({
      name: req.body.name,
      coordinator: user,
    });
    res.json(team);
  } catch (error) {
    if (error instanceof QueryFailedError && error.message.includes("duplicate key value violates unique constraint")) {
      res.status(400).json({ message: "Vec postoji tim sa takvim imenom" });
    } else {
      res.status(500).json({ message: "Internal server error" });
    }
  }
}