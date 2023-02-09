import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {User} from "../entity/User";

export async function isAdmin(req:Request, res: Response, next: () => void){
    const user = (req as any).user as User;
    if(user.userRole != 'admin'){
        res.sendStatus(403);
    } else {
        next();
    }
}

export async function isEditor(req:Request, res: Response, next: () => void){
    const user = (req as any).user as User;
    if(user.userRole != 'editor'){
        res.sendStatus(403);
    } else {
        next();
    }
}


export async function getAllUsers(req: Request, res:Response){
    const user= await AppDataSource.getRepository(User).find();
    console.log(user);
    res.json(user);
}

export async function registerNewUser(req:Request, res:Response){
    console.log(req.body);
        const movie = await AppDataSource.getRepository(User).save({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            userRole: req.body.userRole
        })
        res.json(movie)
}