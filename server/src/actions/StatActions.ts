import {Request, Response} from "express";
import { AppDataSource } from "../data-source";
import { User } from "../entity/User";
import { Activity } from "../entity/Activity";


export async function pointsPerMonth(req: Request, res: Response) {
  const today = new Date();
  const yearAgo = new Date(new Date().setDate(today.getDate() - 365));

  const query = AppDataSource.getRepository(Activity).createQueryBuilder("activity")
    .select("MONTH(date) as month, SUM(numOfPoints) as points")
    .where("date >= :yearAgo", { yearAgo: yearAgo })
    .groupBy("month");

  const subquery = AppDataSource.getRepository(Activity).createQueryBuilder("activity")
    .select("DISTINCT MONTH(date) as month")
    .where("date >= :yearAgo", { yearAgo: yearAgo });

  query.andWhere("MONTH(date) IN (" + subquery.getQuery() + ")");

  const result = await query.getRawMany();

  const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const numPoints = Array(12).fill(0);

  for (const row of result) {
    const monthIndex = row.month - 1; // months are 1-indexed
    numPoints[monthIndex] = row.points;
  }

  const nums = {
    labels: monthLabels,
    numPoints: numPoints
  };
  res.json(nums);
}



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