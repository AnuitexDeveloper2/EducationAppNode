import { Request, Response, Router, NextFunction } from "express";
import * as userService from ".././services/userService"



export async function getUserAsync(req: Request,res: Response,next: NextFunction) {

  await userService.getByIdAsync(req.body)
  .then((user) =>res.json({user}))
  .catch(err =>next(err))

}

export async function getAllAsync(req: Request, res: Response, next: NextFunction) {

  userService.getAllAsync()
            .then(users => res.json(users))
            .catch(err => next(err));
}

export function editAsync(req: Request, res: Response, next: NextFunction) {
  
  userService.editAsync(req.body)
      .then((err) => res.json({err}))
      .catch(err => next(err));
}

export function removeAsync(req: Request, res: Response, next: NextFunction) {
  
  userService.removeAsync(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}