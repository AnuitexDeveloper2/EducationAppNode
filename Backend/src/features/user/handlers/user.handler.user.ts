import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService"



export async function getProfile(req: Request, res: Response, next: NextFunction) {
  userService.getById(req.body)
    .then((user) => res.json({ user }))
    .catch(err => next(err))
}

export function edit(req: Request, res: Response, next: NextFunction) {
  userService.edit(req.body)
    .then((err) => res.json({ err }))
    .catch(err => next(err));
}

export function changePassword(req: Request, res: Response, next: NextFunction) {
  userService.changePassword(req.body)
    .then((err) => res.json({ err }))
    .catch(err => next(err));
}
