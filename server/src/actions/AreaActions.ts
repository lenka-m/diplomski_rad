import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import {Area} from "../entity/Area";


export async function getAllAreas(req: Request, res:Response){
    const areas= await AppDataSource.getRepository(Area).find();
    console.log(areas);
    res.json(areas);
}

export async function insertNewArea(req:Request, res:Response){
    console.log(req.body);
        const area = await AppDataSource.getRepository(Area).save({
            name: req.body.name
        })
        res.json(area)
}