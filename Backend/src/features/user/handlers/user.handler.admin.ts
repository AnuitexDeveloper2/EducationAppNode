import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export async function getAllAsync(req: Request, res: Response, next: NextFunction) {
    userService.getAllAsync()
              .then(users => res.json(users))
              .catch(err => next(err));
  }

  export function removeAsync(req: Request, res: Response, next: NextFunction) {
  
    userService.removeAsync(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
  }
  
  export async function getUsersAsync(req:Request, res: Response, next: NextFunction) {
  
    userService.getUserAsync(req.body)
    .then((result) =>res.json(result))
    .catch(err => next(err));
  }
