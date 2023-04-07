import {Request, Response} from "express";
import {AppDataSource } from "../data-source";
import { Call } from "../entity/Call";
import { User } from "../entity/User";
import { Project } from "../entity/Project";
import { Team } from "../entity/Team";


export async function createCall(req: Request, res: Response){
    
    const user = await AppDataSource.getRepository(User).findOne({where: {id: req.body.postedBy}});
    const project = await AppDataSource.getRepository(Project).findOne({where: {id: req.body.project}});
    const team = await AppDataSource.getRepository(Team).findOne({where:{id: req.body.team}});   
    const status = calculateStatus(req.body.startDate, req.body.endDate);

    const call = await AppDataSource.getRepository(Call).save({
        header: req.body.header,
        postedBy: user,
        startDate: req.body.startDate,
        endDate: req.body.endDate,
        applyLink: req.body.applyLink,
        status: status,
        project: project,
        team: req.body.team!=='' ? (team) : null
    })
    
    res.json(call)
}

export async function searchCalls(req:Request, res: Response){
    await updateCallStatus();
   
    const id = req.query.callId;
    const startDate = req.query.StartDate;
    const endDate = req.query.endDate;
    const postedBy = req.query.postedBy;
    const status = req.query.status;
       const query = AppDataSource.getRepository(Call)
       .createQueryBuilder("call")
       .leftJoinAndSelect("call.postedBy", "postedBy")
       .leftJoinAndSelect("call.project", "project")
       .leftJoinAndSelect("call.team","team")
       .select([
        "call.id",
        "call.header",
        "call.startDate",
        "call.endDate",
        "call.applyLink",
        "call.status",
        "call.project",
        "postedBy.email",
        "postedBy.firstName",
        "postedBy.lastName",
        "project.name",
        "team.name"
    ])
    .orderBy("call.startDate", "DESC");
       if (id) {
           query.andWhere("call.id = :id", { id: id });
       }
       if(startDate){
          query.andWhere("call.startDate = :startDate", {startDate:startDate});
       }
       if(endDate){
        query.andWhere("call.endDate = :endDate", {endDate:endDate});
        }
   
       if (postedBy) {
           query.andWhere("call.postedBy = :postedBy", { postedBy: postedBy });
       }

       if (status) {
        query.andWhere("call.status = :status", { status: status });
        }
    const calls = await query.getMany();
    res.json(calls);     
}

export async function updateCallStatus() {
    const callRepository = await AppDataSource.getRepository(Call);
    const currentDate = new Date();
    const calls = await callRepository.find();

    for (const call of calls) {
        const newStatus = calculateStatus(call.startDate, call.endDate);
        await callRepository.update({id: call.id}, { status: newStatus});
    }
}

function calculateStatus(startDate, endDate) {
    
    
    const currentDate = new Date();
    //currentDate.setHours(0,0,0,0); // poredi sa ponoc i onda je bitno resetovati.
    
   console.log('currentDate:', currentDate);

    const parsedStartDate = new Date(startDate);
    const parsedEndDate = new Date(endDate);
   console.log('start date:', parsedStartDate);
console.log('endDate:', parsedEndDate);
    if (currentDate < parsedStartDate) {
        console.log('1');
        return "upcoming";
    } else if (currentDate > parsedEndDate) {
        console.log('2');
        return "passed";
    } else if (currentDate >= parsedStartDate && currentDate <= parsedEndDate) {
        console.log('3');
        return "active";
    }
}


