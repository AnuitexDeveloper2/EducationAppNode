import { Request,Response,NextFunction } from "express";
import * as authorService from "../services/authorService";

export async function createAsync(req: Request,res: Response,next: NextFunction) {
     authorService.createAsync(req.body)
    .then((result) =>res.json(result))
    .catch(err =>next(err));
  }

export async function removeAsync(req: Request,res: Response,next: NextFunction) {
    authorService.removeAsync(req.body)
   .then((result) =>res.json(result))
   .catch(err =>next(err));
  }

export async function updateAsync(req:Request,res:Response,next: NextFunction) {
  authorService.updateAsync(req.body)
  .then((result) =>res.json(result))
  .catch((err) =>next(err));
}

export async function getAuthorsAsync(req:Request,res:Response,next: NextFunction) {
  authorService.GetAuthorsAsync(req.body)
  .then((result) =>res.json(result))
  .catch((err) =>next(err));
}
