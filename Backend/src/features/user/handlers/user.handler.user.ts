import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService"



export async function getProfileAsync(req: Request,res: Response,next: NextFunction) {
   userService.getByIdAsync(req.body)
  .then((user) =>res.json({user}))
  .catch(err =>next(err))
}

export function editAsync(req: Request, res: Response, next: NextFunction) {
  console.log(11111111)
  userService.editAsync(req.body)
      .then((err) => res.json({err}))
      .catch(err => next(err));
}

export function changePassword(req: Request, res: Response, next: NextFunction) {
  userService.changePassword(req.body)
      .then((err) => res.json({err}))
      .catch(err => next(err));
}
