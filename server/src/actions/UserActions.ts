import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {User} from "../entity/User";
import { renameFile } from "./uploadActions";
import path = require("path");
import * as fs from 'fs';
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname, '../../uploads'));
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);
    },
  });
  
const upload = multer({ storage: storage });
  

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
  let status = calculateStatus(req.body.totalPoints);
  try{
  const user = await AppDataSource.getRepository(User).save({
    email: req.body.email,
    profilePictureURL:'uploads/pands.jpeg',
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    password: req.body.password,
    telephoneNumber: req.body.telephoneNumber,
    userRole: req.body.userRole,
    userRoleName: req.body.userRoleName!= '' ? (req.body.userRoleName): undefined,
    userStatus: req.body.userRole ==='none' ? status: undefined,
    totalPoints: req.body.totalPoints!= '' ? (req.body.totalPoints): undefined,
    birthday: req.body.birthday!= '' ? (req.body.birthday): undefined
  })
  res.json(user)
  } catch(ex){
    return res.status(400).send('Podaci')
  }
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

export async function changePassword(req:Request, res:Response){
  console.log('doso zahtev');
  const userId = req.body.data.userId;
  const oldPassword = req.body.data.oldPassword;
  const newPassword = req.body.data.newPassword;
  const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    if(user.password !== oldPassword){
      return res.status(404).json({message:'Wrong password!'});
    } else{
      user.password = newPassword;

      AppDataSource.getRepository(User).save(user)
        .then(() => {
          return res.status(200).json({ message: 'Password updated successfully', user });
        })
        .catch((error) => {
          console.log('Error saving user', error);
          return res.status(500).json({ message: 'Error changing password' });
        });
    }
}

export async function updatePic(req: Request, res: Response) {
  const userId = req.body.data.userId;
  console.log(userId)
  const user = await AppDataSource.getRepository(User).findOne({ where: { id: userId } });
  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }
    
  const fileName = user.firstName + user.lastName + '-' + user.id;
  const extension = req.body.data.extension;
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

function calculateStatus(totalPoints) :string{
  console.log('pozvao funkciju');
  if(totalPoints< 30){
    return "beba";
  } else if(totalPoints>= 30 && totalPoints<80){
    return "obzerver";
  } else if(totalPoints>=80){
    console.log('evo usao u if')
    return "full"
  } 
}

export async function firstUser(){
  const user = await AppDataSource.getRepository(User).save({
    email: 'l@gmail.com',
    profilePictureURL:'uploads/pands.jpeg',
    firstName: 'Lenka',
    lastName: 'Milosevic',
    password: 'lenka',
    telephoneNumber: '+381637771409',
    userRole: 'admin',
    userRoleName: 'Admin',
    userStatus: undefined,
    totalPoints:  undefined,
    birthday: undefined
  })
}