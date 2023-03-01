import {Request, Response} from "express";

import path = require("path")
import { createActivity, finalUpdateActivity, getAllActivities, updateActivity, deleteActivity, searchActivities } from "./actions/ActivityActions";
import { getAllProjects , insertNewProject, updateProjectVisibility} from "./actions/ProjectActions";
import {deleteUser, getAllUsers, isAdmin, isEditor, registerNewUser, searchUsers, updatePic} from "./actions/UserActions";
import { getAllTeams, postNewTeam } from "./actions/TeamActions";
import { getAllTasks, postNewTask } from "./actions/TaskActions";
import * as multer from "multer"
import { renameFile } from "./actions/uploadActions";

export interface Route {
    method: 'get' | 'post' |  'patch' | 'delete',
    route: string,
    actions: ((req: Request, res: Response, next?: any) => void | Promise<void>)[]
}

const upload = multer({
    dest: path.resolve('uploads/'), fileFilter: function(req, file, cb){
        if(!file){
            cb(null, false);
        } else{
            cb(null, true);
        }
    }
}).fields([
    {
        name:'image',
        maxCount:1
    },{
        name:'file',
        maxCount:1
    }
])

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
    method: 'patch',
    route:'/users-profilePic',
    actions: [upload, renameFile('image'), renameFile('file'), updatePic ]
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
    method: 'patch',
    route: '/projects-visibility',
    actions: [isAdmin || isEditor, updateProjectVisibility]
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
    method:'get',
    route: '/activity/search',
    actions: [searchActivities]
},{
    method: 'patch',
    route: '/patch-activity',
    actions: [isEditor, updateActivity]
},{
    method: 'patch',
    route: '/activity-final',
    actions: [isAdmin, finalUpdateActivity]
},{
    method:'get',
    route:'/activity',
    actions: [isAdmin || isEditor, getAllActivities]
}]