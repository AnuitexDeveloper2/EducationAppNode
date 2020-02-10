import { Request, Response, NextFunction } from "express";
import * as authService from '../auth/auth.service';

export async function registerAsync(req: Request,res: Response,next: NextFunction) {
   
    let result = await authService.registerAsync(req.body)
    .then((err) => res.json({err}))
    .catch(err => next(err))
  }

  export async function authenticateAsync(req: Request, res: Response, next: NextFunction) {
    authService.logInAsync(req.body)
    .then(token => res.setHeader("token",token))
    .catch(err => next(err));
  }

  export async function changePassword(req: Request, res: Response, next: NextFunction) {
    console.log(req.header);
    authService.changePasswordAsync(req.body)
    .then((err) => res.json({err}))
    .catch(err => next(err))
  }

  