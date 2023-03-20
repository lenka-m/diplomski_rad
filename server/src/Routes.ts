import {Request, Response} from "express";

import path = require("path")
import { createActivity, finalUpdateActivity, getAllActivities, updateActivity, deleteActivity, searchActivities } from "./actions/ActivityActions";
import { getAllProjects , insertNewProject, updateProjectVisibility} from "./actions/ProjectActions";
import {deleteUser, getAllUsers, isAdmin, isEditor, isAdminOrEditor,registerNewUser, searchUsers, updatePic, changePassword, top10Besties} from "./actions/UserActions";
import { postNewTeam, searchTeams } from "./actions/TeamActions";
import { getAllTasks, postNewTask, searchTasks, updateTaskVisibility } from "./actions/TaskActions";
import { createCall, searchCalls } from "./actions/CallActions";
import { getUserStatistics } from "./actions/StatActions";

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
    method:'get',
    route:'/teams/search',
    actions: [searchTeams]
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
    actions:[isAdminOrEditor, postNewTask]
},{
    method:'patch',
    route:'/tasks-visibility',
    actions: [isAdminOrEditor, updateTaskVisibility]
},{
    method:'get',
    route:'/tasks/search',
    actions: [isAdminOrEditor, searchTasks]
},{
    method: 'delete',
    route:'/users',
    actions: [isAdmin, deleteUser]
},{
    method:'get',
    route:'/users/topTen',
    actions:[top10Besties]
},{
    method: 'patch',
    route: '/users-profilePic',
    actions: [updatePic],
  },{
    method: 'get',
    route: '/users',
    actions:[isAdmin, getAllUsers]
},{
    method: 'get',
    route: '/users/search',
    actions: [isAdmin, searchUsers]
},{
    method: 'get',
    route:'/users/stats',
    actions:[isAdmin, getUserStatistics]
},{
    method:'patch',
    route: '/users-passwordChange',
    actions: [changePassword]
},{
    method: 'post',
    route: '/projects',
    actions: [isAdmin, insertNewProject]
},{
    method: 'patch',
    route: '/projects-visibility',
    actions: [isAdminOrEditor, updateProjectVisibility]
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
    actions: [isAdminOrEditor, getAllActivities]
},{
    method:'get',
    route:'/call/search',
    actions:[searchCalls]
},{
    method:'post',
    route:'/call',
    actions:[createCall]
}]