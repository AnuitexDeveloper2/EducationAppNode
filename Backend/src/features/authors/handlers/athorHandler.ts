import { Request,Response,NextFunction } from "express";
import * as authorService from "../services/authorService";
import authorModel from "../../shared/db-models/author";

export async function createAsync(req: Request,res: Response,next: NextFunction) {
     authorService.create(req.body)
    .then(() =>res.json())
    .catch(err =>next(err))
  }