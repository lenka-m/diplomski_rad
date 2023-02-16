import {Request, Response} from "express";

import path = require("path")
import { createActivity, finalUpdateActivity, getAllActivities, updateActivity, deleteActivity } from "./actions/ActivityActions";
import { getAllProjects , insertNewProject} from "./actions/ProjectActions";
import {deleteUser, getAllUsers, isAdmin, isEditor, registerNewUser, searchUsers} from "./actions/UserActions";
import { getAllTeams, postNewTeam } from "./actions/TeamActions";
import { getAllTasks, postNewTask } from "./actions/TaskActions";


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
    method: 'post',
    route: '/teams',
    actions: [isAdmin, postNewTeam]
},{
    method: 'get',
    route:'/tasks',
    actions:[getAllTasks]
},{
    method:'post',
    route:'/tasks',
    actions:[isAdmin, postNewTask]
},{
    method: 'delete',
    route:'/users',
    actions: [isAdmin, deleteUser]
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
    method:'delete',
    route:'/activity',
    actions: [deleteActivity]
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