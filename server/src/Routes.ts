import {Request, Response} from "express";

import path = require("path")
import { createActivity, finalUpdateActivity, getAllActivities, updateActivity } from "./actions/ActivityActions";
import { getAllAreas } from "./actions/AreaActions";
import { getAllProjects , insertNewProject} from "./actions/ProjectActions";
import { getAllSubAreas } from "./actions/SubAreaActions";
import {getAllUsers, isAdmin, isEditor, registerNewUser} from "./actions/UserActions";


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
    route: '/areas',
    actions: [getAllAreas]
},{
    method: 'get',
    route:'/subareas',
    actions:[getAllSubAreas]
},{
    method: 'get',
    route: '/users',
    actions:[isAdmin, getAllUsers]
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
    route: '/activity',
    actions: [isAdmin, updateActivity]
},{
    method:'get',
    route:'/activity',
    actions: [isAdmin || isEditor, getAllActivities]
}]