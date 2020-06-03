import { Request, Response, NextFunction } from "express";
import * as userService from "../services/userService";

export async function getAll(req: Request, res: Response, next: NextFunction) {
  userService.getAll()
    .then(users => res.json(users))
    .catch(err => next(err));
}

export function remove(req: Request, res: Response, next: NextFunction) {
  userService.remove(req.body)
    .then((result) => res.json({ result }))
    .catch(err => next(err));
}

export async function getUsers(req: Request, res: Response, next: NextFunction) {
  userService.getUser(req.body)
    .then((result) => res.json(result))
    .catch(err => next(err));
}

export function blockUser(req: Request, res: Response, next: NextFunction) {
  userService.blockUser(req.body)
    .then((result) => res.json({ result }))
    .catch(err => next(err));
}

