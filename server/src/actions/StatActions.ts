import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";




export async function getUserStatistics(req: Request, res: Response) {
    const users = await AppDataSource.getRepository(User).find();
    const today = new Date();
      const monthAgo = new Date(new Date().setDate(today.getDate() - 30));
      const yearAgo = new Date(new Date().setDate(today.getDate()-365))
      console.log(today);
      console.log(yearAgo);
    const stats = {
        firstNumbers:{
            totalUsersCount: users.length,
            totalMemberCount: 0,
            lastMonthCount: 0,
            lastYearCount: 0
        },
        userRoleCounts:{
            adminCount:0,
            editorCount:0,
            noneCount:0
        },
        memberStatusCounts:{
            fullCount:0,
            bebaCount:0,
            obzerverCount:0
        }
    }
    
  
    users.forEach((user) => {
      switch (user.userRole) {
        case 'admin':
          stats.userRoleCounts.adminCount++;
          break;
        case 'editor':
          stats.userRoleCounts.editorCount++;
          break;
        case 'none':
          stats.userRoleCounts.noneCount++;
          stats.firstNumbers.totalMemberCount++;
          switch(user.userStatus){
            case 'full':
              stats.memberStatusCounts.fullCount++;
              break;
            case 'obzerver':
              stats.memberStatusCounts.obzerverCount++;
              break;
            case 'beba':
              stats.memberStatusCounts.bebaCount++;
              break;
          }
          break;
      }
      
      
      if(user.lastLogin != null && user.lastLogin>= yearAgo){
        stats.firstNumbers.lastYearCount++;
        if(user.lastLogin != null && user.lastLogin>=monthAgo){
            stats.firstNumbers.lastMonthCount++;
        }
      }
    });
  
    res.json(stats);
  }