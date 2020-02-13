import { Request, Response, NextFunction } from "express";
import * as jwt from "jsonwebtoken";
import * as env from 'dotenv';
import { generateTokens } from "./jwtHelper";
import userModel from "../../shared/db-models/user";


env.config();
const jwtSecret: any = process.env.secret;
export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = <string>req.headers["accesstoken"];
  let jwtPayload;
  let newTokens: any;
  try {
    jwtPayload = <any>jwt.verify(accessToken, jwtSecret);
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
       if (err.name == 'TokenExpiredError') {
      const refreshToken = <string>req.headers["refreshtoken"];
      newTokens = refreshTokens(refreshToken,res);
      const test =newTokens.token;
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
  jwtPayload = <any>jwt.verify(refreshToken, jwtSecret);
  console.log(jwtPayload);
  try {
    res.locals.jwtPayload = jwtPayload;
  } catch (err) {
    if (err.name == 'TokenExpiredError') {}
    const user = new userModel();
    user._id = jwtPayload._id;
    user.role = jwtPayload.role;
   
   return generateTokens(user,res);
  }
  res.status(401).send('refresh token is not valid');
  return ;
  
 
  

}