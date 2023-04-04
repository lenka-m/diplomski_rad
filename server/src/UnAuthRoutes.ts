import {Request, Response} from "express";
import { login } from "./actions/UserActions";



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
    }
]
