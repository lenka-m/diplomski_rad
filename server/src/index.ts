import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as jwt from 'jsonwebtoken'



const express = require('express');

import { Routes } from "./Routes";

AppDataSource.initialize().then(async () => {
    const app = express();
    const port = 3001;
    var cors = require('cors');
    app.use(express.json());
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    app.use((req, res, next) => {
        res.setHeader('Cache-Control', 'no-cache');
        next();
      });
    app.options('*', cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }));
      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        next();
      });
    
    app.use('/uploads', express.static('uploads'));      
    app.post('/login',async (req, res) =>{
        const {email, password} = req.body;
        console.log('ee')
        const user =  await AppDataSource.getRepository(User).findOne({
            where: {
                email: email,
                password: password
            }
        });

        if(!user){
            res.status(400).json({message: 'Neispravna lozinka i/ili šifra. Pokušaj ponovo :)'});
            return;
        } 
        const token = jwt.sign({id: user.id}, 'jwttoken1252t', {expiresIn: '3h'});
        console.log('setuje token');
        res.json({
            user, 
            token
        })

    })

    app.use(async(req, res, next) =>{
        const authorization = req.headers.authorization;
        //console.log(authorization);
        if(!authorization){
             res.json({error: 'Unauthorised'})
             return;
        }

        const splitted = authorization.split(' ');
        if(splitted.length !== 2 || splitted[0] != 'Bearer'){
            res.status(401).json({error: 'Wrong type of request'});
            return;
        }
        const token = splitted[1];
        try{
            const userId = jwt.verify(token, 'jwttoken1252t') as {id: number};
            const user =await AppDataSource.getRepository(User).findOne({
                where: {id: userId.id}
            });
    
            if(!user){
                res.status(401).json({error: 'unauthorized'});
                return;
            }
            (req as any).user = user;
            next();
    
        } catch(error){
            res.status(401).json({error: 'niste authorised'});
        }
    })

    app.get('/check', async(req, res)=>{
        const user = (req as any).user;
        res.json(user);
    })

    Routes.forEach( route =>{
        app[route.method](route.route, ... route.actions);
    });

    app.listen(port, () => console.log(`Listening on port ${port}`));

}).catch(error => console.log(error))
