import * as printingEditionService from "../services/printingEditionService";
import { Request, Response, NextFunction } from "express"

export async function create(req: Request, res: Response, next: NextFunction) {
    printingEditionService.create(req.body)
        .then(result => res.json(result))
        .catch(err => next(err));
}

export async function remove(req: Request, res: Response, next: NextFunction) {
    printingEditionService.remove(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}

export async function update(req: Request, res: Response, next: NextFunction) {
    printingEditionService.update(req.body.printingEdition, req.body._id)
        .then(users => res.json(users))
        .catch(err => next(err));
}

export async function getPrintingEditionsForAdmin(req: Request, res: Response, next: NextFunction) {
    printingEditionService.getPrintingEditions(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
}
