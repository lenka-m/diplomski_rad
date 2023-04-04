import { AppDataSource } from "./data-source"
import { User } from "./entity/User"
import * as jwt from 'jsonwebtoken'
import { Routes } from "./Routes";
import { UnAuthRoutes } from "./UnAuthRoutes";
const express = require('express');

AppDataSource.initialize().then(async () => {
    const app = express();
    const port = 3001;

    var cors = require('cors');
    app.set("view engine","ejs");
    app.use(express.json({limit: '5mb'})); 
    app.use('/uploads', express.static('uploads'));

    app.use(express.urlencoded({extended:false}));
    app.use(cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
    }));
    
    UnAuthRoutes.forEach( route =>{
        app[route.method](route.route, ... route.actions);
    });

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


/* Ako krene patch da zeza, ovo ubaciti:
    app.options('*', cors({
        origin: 'http://localhost:3000',
        methods: ['GET', 'POST', 'PATCH', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization']
      }));
      app.use((req, res, next) => {
        res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH');
        next();
      });
*/

/* pravis prvog korisnika:  
firstUser(); - samo gore ubaci funkciju

*/