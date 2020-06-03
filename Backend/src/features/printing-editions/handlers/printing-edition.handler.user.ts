import * as printingEditionService from "../services/printingEditionService";
import { Request, Response, NextFunction } from 'express';

export async function getPrintingEditionsForUser(req: Request, res: Response, next: NextFunction) {
    printingEditionService.getPrintingEditions(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

export async function getPrintingEditionById(req: Request, res: Response, next: NextFunction) {
    printingEditionService.getById(req.body)
        .then(product => res.json(product))
        .catch(err => next(err));
}