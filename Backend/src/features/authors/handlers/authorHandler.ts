import { Request, Response, NextFunction } from "express";
import * as authorService from "../services/authorService";

export async function create(req: Request, res: Response, next: NextFunction) {
  authorService.create(req.body)
    .then((result) => res.json(result))
    .catch(err => next(err));
}

export async function remove(req: Request, res: Response, next: NextFunction) {
  authorService.remove(req.body)
    .then((result) => res.json(result))
    .catch(err => next(err));
}

export async function update(req: Request, res: Response, next: NextFunction) {
  authorService.update(req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

export async function getAuthors(req: Request, res: Response, next: NextFunction) {
  authorService.getAuthors(req.body)
    .then((result) => res.json(result))
    .catch((err) => next(err));
}

export async function getAll(req: Request, res: Response, next: NextFunction) {
  authorService.getAll()
    .then((result) => res.json(result))
    .catch((err) => next(err));
}