import {Request, Response} from "express";
import { forgotPassword, login, resetPassword, resetPasswordPart2, top10Besties } from "./actions/UserActions";
import { searchCalls } from "./actions/CallActions";



export interface Route {
    method: 'get' | 'post' |  'patch' | 'delete',
    route: string,
    actions: ((req: Request, res: Response, next?: any) => void | Promise<void>)[]
}


export const UnAuthRoutes: Route[] = [
    {
        method: 'post', 
        route: '/login',
        actions: [login]
    },{
        method: 'post',
        route:'/forgot-password',
        actions:[forgotPassword]
    },{
        method:'get',
        route:'/reset-password/:id/:token',
        actions:[resetPassword]
    },{
        method:'post',
        route:'/reset-password/:id/:token',
        actions:[resetPasswordPart2]
    },{
        method:'get',
        route:'/call/search',
        actions:[searchCalls]
    },{
        method:'get',
        route:'/users/topTen',
        actions:[top10Besties]
    }
]