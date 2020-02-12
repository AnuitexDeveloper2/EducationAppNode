import { Access } from "accesscontrol";
import { Request,Response,NextFunction } from 'express'
import * as roles  from "../accessControle/roleControle";
import * as jwt from "jsonwebtoken";
import * as env from 'dotenv';
import { Role } from "../enums/role";

const access: any = roles.roles();
env.config();
const jwtSecret: any = process.env.secret;

export  function grantAccess(currentRole: any) {
    return  (req: Request, res: Response, next: NextFunction) => {
        const accessToken = <string>req.headers["accesstoken"];
        const jwtPayload = <any>jwt.verify(accessToken, jwtSecret);
        console.log(Role[jwtPayload.role]);
        console.log(Role[currentRole]);
        if(Role[jwtPayload.role] !== Role[currentRole] ) {
           res.status(401).send(' you are dont permission' )
           return;
        }        
        next()
    }
  }