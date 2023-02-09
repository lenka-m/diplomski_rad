import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import {Area} from "../entity/Area";
import { SubArea } from "../entity/SubArea";


export async function getAllSubAreas(req: Request, res:Response){
    const subareas = await AppDataSource.getRepository(SubArea).find({
        relations: {
            area: true
        }
    })
    res.json(subareas);
}

export async function insertNewSubArea(req:Request, res:Response){
     console.log(req.body);
     const area = await AppDataSource.getRepository(Area).findOne({where: {id: req.body.areaId}});
     console.log(area);
     const subarea = await AppDataSource.getRepository(SubArea).save({         
        name: req.body.name,
        area: area
     })
    res.json(subarea);
}