import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {User} from "../entity/User";
import { getRepository } from "typeorm";

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

export async function deleteUser(req:Request, res:Response){
    try {
        console.log(`pozvanan funkcija + ${req.body.userId}`)
        const user = await AppDataSource.getRepository(User).delete({
        id:req.body.userId
      });

      
      res.json(user);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Failed to delete user' });
    }
}


export async function searchUsers(req: Request, res:Response){
    const email = req.query.email;
    const firstName = req.query.firstName;
    const lastName = req.query.lastName;
    const userRole = req.query.userRole;

    const query = AppDataSource.getRepository(User).createQueryBuilder("user");

    if (email) {
        query.andWhere("user.email = :email", { email: email });
    }

    if (firstName) {
        query.andWhere("user.firstName = :firstName", { firstName: firstName });
    }

    if (lastName) {
        query.andWhere("user.lastName = :lastName", { lastName: lastName });
    }

    if (userRole) {
        query.andWhere("user.userRole = :userRole", { userRole: userRole });
    }

    const users = await query.getMany();
    res.json(users);
}

