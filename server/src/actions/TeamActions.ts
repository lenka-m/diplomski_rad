import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import { Team } from "../entity/Team";


export async function getAllTeams(req: Request, res:Response){
    const teams= await AppDataSource.getRepository(Team).find();
    console.log(teams);
    res.json(teams);
}

export async function postNewTeam(req:Request, res:Response){
    console.log(req.body);
        const team = await AppDataSource.getRepository(Team).save({
            name: req.body.name
        })
        res.json(team)
}