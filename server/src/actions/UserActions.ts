import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {User} from "../entity/User";
import path = require("path");
import * as fs from 'fs';


export async function isAdmin(req:Request, res: Response, next: () => void){
    const user = (req as any).user as User;
    if(user.userRole != 'admin'){
        return res.status(403).send('Forbidden');
    } else {
        next();
    }
}

export async function isEditor(req:Request, res: Response, next: () => void){
    const user = (req as any).user as User;
    if(user.userRole != 'editor'){
        return res.status(403).send('Forbidden');
    } else {
        next();
    }
}
export async function isAdminOrEditor(req: Request, res: Response, next: () => void) {
    const user = (req as any).user as User;
    if (user.userRole !== 'admin' && user.userRole !== 'editor') {
        return res.status(403).send('Forbidden');
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
        const user = await AppDataSource.getRepository(User).save({
            email: req.body.email,
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            password: req.body.password,
            userRole: req.body.userRole
        })
        res.json(user)
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

export async function updatePic(req: Request, res: Response) {
    const userId = req.body.userId;
    const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    // Extract file extension from content-type header
    const contentType = req.header('content-type');
    const extension = req.body.data.extension;
  
    const fileName = user.firstName + user.lastName + '-' + user.id;
    const fileUrl = `uploads/${fileName}.${extension}`;
  
    fs.writeFile(fileUrl, req.body.data.profilePic, { encoding: 'binary' }, (err) => {
      if (err) {
        console.log('Error uploading file', err);
        return res.status(500).json({ message: 'Error uploading profile picture' });
      }
  
      user.profilePictureURL = fileUrl;
      AppDataSource.getRepository(User).save(user)
        .then(() => {
          return res.status(200).json({ message: 'Profile picture updated successfully', user });
        })
        .catch((error) => {
          console.log('Error saving user', error);
          return res.status(500).json({ message: 'Error saving user' });
        });
    });
  }
  
  