import { Request,Response,NextFunction } from 'express'
import * as jwt from "jsonwebtoken";
import * as env from 'dotenv';
import { Role } from "../enums/role";

env.config();
const jwtSecret: any = process.env.refreshTokenSecret;

export  function checkPermission(currentRole: any) {
    return  (req: Request, res: Response, next: NextFunction) => {
       
        const refreshToken = <string>req.headers["refreshtoken"];
        const jwtPayload = <any>jwt.verify(refreshToken, jwtSecret);
       
        if(Role[jwtPayload.role] !== Role[currentRole] ) {
           res.status(401).send(' you are dont permission' )
           return;
        }        
        next()
    }
  }