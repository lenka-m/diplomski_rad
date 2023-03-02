import {Request, Response} from 'express'
import * as fs from 'fs'
import * as path from 'path'

export function renameFile(name: string){
    return function handleUpload(request: Request, response: Response, next?: any){
        if(!request.files){
            next();
            return;
        }

        if(!request.files[name]){
            next();
            return; 
        }

        const file = request.files[name][0];
        const tempPath= file.path;
        const targetPath = path.resolve('uploads/' + file.originalname);
        const data = request.body;
        data[name] = file.originalName;
        fs.rename(tempPath, targetPath, err=>{

        })
        next();
    }
}