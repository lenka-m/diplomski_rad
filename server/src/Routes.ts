import {Request, Response} from "express";

import path = require("path")
import { createActivity, finalUpdateActivity, getAllActivities, updateActivity } from "./actions/ActivityActions";
import { getAllProjects , insertNewProject} from "./actions/ProjectActions";
import {getAllUsers, isAdmin, isEditor, registerNewUser, searchUsers} from "./actions/UserActions";
import { getAllTeams } from "./actions/TeamActions";
import { getAllTasks } from "./actions/TaskActions";


export interface Route {
    method: 'get' | 'post' |  'patch' | 'delete',
    route: string,
    actions: ((req: Request, res: Response, next?: any) => void | Promise<void>)[]
}

export const Routes: Route[] = [
    {
    method: 'get', 
    route: '/projects',
    actions: [getAllProjects]
},{
    method: 'get', 
    route: '/teams',
    actions: [getAllTeams]
},{
    method: 'get',
    route:'/tasks',
    actions:[getAllTasks]
},{
    method: 'get',
    route: '/users',
    actions:[isAdmin, getAllUsers]
},{
    method: 'get',
    route: '/users/search',
    actions: [isAdmin, searchUsers]
},{
    method: 'post',
    route: '/projects',
    actions: [isAdmin, insertNewProject]
},{
    method: 'post',
    route: '/register',
    actions: [isAdmin, registerNewUser]
},{
    method:'post',
    route:'/activity',
    actions: [createActivity]
},{
    method: 'patch',
    route: '/updateActivity',
    actions: [isEditor, updateActivity]
},{
    method: 'patch',
    route: '/activity',
    actions: [isAdmin, updateActivity]
},{
    method:'get',
    route:'/activity',
    actions: [isAdmin || isEditor, getAllActivities]
}]