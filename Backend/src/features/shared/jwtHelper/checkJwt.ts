import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as env from 'dotenv';
import { generateTokens } from "./jwtHelper";
import userModel from "../../shared/db-models/user";
import { TokenExpiredError } from "jsonwebtoken";


env.config();
const jwtSecret: any = process.env.secret;
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {

  const accessToken = <string>req.headers["access"];
  let jwtPayload;
  let newTokens: any;
  
  try {
    jwtPayload = <any>jwt.verify(accessToken, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    console.log(err);
       if (err.name == 'TokenExpiredError') {
      
      const refreshToken = <string>req.headers["refresh"];
      
     newTokens = refreshTokens(refreshToken,res);
      const test =newTokens.token;
     res.setHeader("Access", test);
     res.setHeader('Refresh', newTokens.refreshToken);

    }
    if (err.name == 'JsonWebTokenError' ) {
      
      res.status(401).send("token is not valid");
      return;
    }
   
  }

  next();
};




function refreshTokens(refreshToken: string, res: Response) {
  let jwtPayload;
  
  const jwtSecret : any = process.env.refreshTokenSecret
  try {
    
    jwtPayload = <any>jwt.verify(refreshToken, jwtSecret);
   
  } catch (error) {

    return res.status(401).send('refresh token is not valid');

  }
  
  const user = new userModel();
  user._id = jwtPayload.id;
  user.role = jwtPayload.role;
 
 return generateTokens(user);
  

}