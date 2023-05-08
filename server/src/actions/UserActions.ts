import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import {User} from "../entity/User";
import * as jwt from 'jsonwebtoken'
import * as fs from 'fs';

var nodemailer = require('nodemailer');
const JWT_secret = "B6AB80B5A402FBF7F273339600E76E7A840DFF5351711EC82DA9677CE929CDEB";



export async function login(req:Request, res:Response){
        const {email, password} = req.body;
        const timestamp = new Date();

        // Ukoliko ne postoji nalog sa emailom:
        const existingUser = await AppDataSource.getRepository(User).findOne({ where:{ email: email }});
        if (!existingUser) {
            return res.status(400).send('Ne postoji nalog sa unetim mejlom');
        } 
        const user =  await AppDataSource.getRepository(User).findOne({
            where: {
                email: email,
                password: password
            }
        });
        // Ukoliko postoji nalog ali nije unet dobar mejl:
        if(!user){
            return res.status(400).send('Neispravna lozinka. Pokušaj ponovo :)');
            //return;
        }
        // Loginovanje, apdejt tajmstempa i dodela tokena: 
        await AppDataSource.getRepository(User).update(
            { id: user.id },
            {
              lastLogin: timestamp
            }
        ); 
        const token = jwt.sign({id: user.id}, 'jwttoken1252t', {expiresIn: '3h'});
        console.log('setuje token');
        res.json({
            user, 
            token
        })

      }


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
    //console.log(user);
    res.json(user);
}

export async function registerNewUser(req:Request, res:Response){
  console.log(req.body);
  let status = calculateStatus(req.body.totalPoints);
  try{
    // Da li postoji korisnik sa emailom:
    const existingUser = await AppDataSource.getRepository(User).findOne({ where:{ email: req.body.email }});
    if (existingUser) {
      return res.status(400).send('Korisnik za unetim mejlom vec postoji');
    } 
    // Ako ne postoji pravi korisnika:
      const user = await AppDataSource.getRepository(User).save({
        email: req.body.email,
        profilePictureURL:'uploads/pands.jpeg',
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password,
        telephoneNumber: req.body.telephoneNumber,
        userRole: req.body.userRole,
        userRoleName: req.body.userRoleName != '' ? (req.body.userRoleName) : undefined,
        userStatus: req.body.userRole ==='none' ? status : undefined,
        totalPoints: req.body.totalPoints != '' ? (req.body.totalPoints) : undefined,
        startingPoints: req.body.totalPoints != '' ? (req.body.totalPoints) : undefined,
        birthday: req.body.birthday != '' ? (req.body.birthday) : undefined,
        dateOfMembership: req.body.dateOfMembership != '' ? (req.body.dateOfMembership) : undefined,
        faculty: req.body.faculty != '' ? (req.body.faculty) : undefined,
      })
      res.json(user)
  } catch(ex){
    return res.status(400).send('Podaci')
  }
}

export async function deleteUser(req:Request, res:Response){
    try {
        //console.log(`pozvanan funkcija + ${req.body.userId}`)
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


    console.log("nina i lena");

    const users = await query.getMany();
    res.json(users);
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
    return "obzerver";
  } else if(totalPoints>= 30 && totalPoints<80){
    return "beba";
  } else if(totalPoints>=80){
    console.log('evo usao u if')
    return "full"
  } 
}

export async function top10Besties(req: Request, res:Response){
  const today = new Date();
  const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);

  const topUsers = await AppDataSource
  .getRepository(User)
  .createQueryBuilder("user")
  .leftJoinAndSelect("user.activities", "activity")
  .select([
    "user.firstName AS firstName" , 
    "user.lastName AS lastName",
    "user.profilePictureURL AS pic",
    "SUM(activity.numOfPoints) AS points",
    "ROW_NUMBER() OVER (ORDER BY SUM(activity.numOfPoints) DESC) AS rank"])
  .where("activity.date >= :lastMonth", { lastMonth })
  .andWhere("activity.status = 'completed'")
  .groupBy("user.id")
  .orderBy("SUM(activity.numOfPoints)", "DESC")
  .limit(10)
  .getRawMany();

  res.json(topUsers)
}

export async function forgotPassword(req: Request, res:Response){
  const email = req.body.email;
  try{
    const user =  await AppDataSource.getRepository(User).findOne({
      where: {
          email: email,
      }
    });
    if(!user){
        res.status(401).json({message: 'Ne postoji nalog sa unetim mejlom'});
        return;
    }
    const secret = JWT_secret + user.password;
    const token = jwt.sign({id:user.id, email:user.email}, secret,{expiresIn:'15m'} );
    const link = `http://localhost:3001/reset-password/${user.id}/${token}`
    
    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'lenkanodemailer@gmail.com',
        pass:'cncdgvktwruzcyej'
      }
    });

    var mailOptions = {
      from: 'lenkanodemailer@gmail.com',
      to: email,
      subject: 'Reset Password',
      text: link
    };
     transporter.sendMail(mailOptions, function(error, info){
       if (error) {
         console.log(error);
       } else {
         console.log('Email sent: ' + info.response);
       }
     });

    
  } catch(ex){
    console.log(ex);
  }

}

export async function resetPassword(req:Request, res:Response){
  const {id, token} = req.params;
  const user =  await AppDataSource.getRepository(User).findOne({
    where: {
        id: id,
    }
  });
  if(!user){
      res.status(401).json({message: 'Ne postoji nalog.'});
      return;
  }
  try{
    const secret = JWT_secret + user.password;
    const verify = jwt.verify(token, secret);
    res.render("index.ejs", {email: verify.email, status:"Not verified"});
  } catch(error){
    res.status(401).json({message:"Not verified"});
  }
  console.log(req.params);
}

export async function resetPasswordPart2(req:Request, res:Response){
  const {id, token} = req.params;
  const {password, confirmPassword} = req.body;
  console.log(req);
  const user =  await AppDataSource.getRepository(User).findOne({
    where: {
        id: id,
    }
  });
  if(!user){
      res.status(401).json({message: 'Ne postoji nalog.'});
      return;
  }
  
  try{
    const secret = JWT_secret + user.password;
    const verify = jwt.verify(token, secret);

    const newPassword = req.body.password;
    const confirmPassword = req.body["confirm_password"];

    console.log("New password:", newPassword);
    console.log("Confirm password:", confirmPassword);
    user.password = password;
    console.log(req.body);
    AppDataSource.getRepository(User).save(user)

      .catch((error) => {
        console.log('Error saving user', error);
        return res.status(500).json({ message: 'Error changing password' });
      });

      res.render("index", {email: verify.email, status:"verified"})
  } catch(error){
    res.status(401).json({message:"Not verified"});
  }
  
  console.log(req.params);
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
    birthday: undefined,
    dateOfMembership: undefined,
    faculty: undefined,
  })
}