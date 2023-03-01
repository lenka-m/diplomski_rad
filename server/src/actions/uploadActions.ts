import {Request, Response} from "express";
import * as fs from 'fs';
import { request } from "http";
import * as path from 'path';



export function renameFile(name:string){

    return function handleUpload(req:Request, res:Response, next?: any){
        if(!req.files){
            next();
            return;
        }
        if(!req.files(name)){
            next();
            return;
        }
        const file = req.files[name][0];
        const tempPath = file.path;
        const targetPath = path.resolve('uploads/', file.originalName);
        const data = req.body;
        data[name] = file.originalName;
        fs.rename(tempPath, targetPath, err =>{

        })
        next();
    }
}