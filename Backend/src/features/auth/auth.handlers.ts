import { Request, Response, NextFunction } from "express";
import * as authService from '../auth/auth.service';
import * as jwtHelper from "../shared/jwtHelper/jwtHelper";

export async function registerAsync(req: Request,res: Response,next: NextFunction) {
   
    let result = await authService.registerAsync(req.body)
    .then((err) => res.json({err}))
    .catch(err => next(err))
  }

  export async function authenticateAsync(req: Request, res: Response, next: NextFunction) {
   const result = await authService.logInAsync(req.body)
    .then(user => res.send(jwtHelper.generateTokens(user,res)))
    .catch();
    
  }

  export async function changePasswordAsync(req: Request, res: Response, next: NextFunction) {
    authService.changePasswordAsync(req.body)
    .then((err) => res.json({err}))
    .catch(err => next(err))
  }

  