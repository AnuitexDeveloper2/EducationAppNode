import * as printingEditionService from "../services/printingEditionService";
import { Request, Response, NextFunction } from "express"

export async function createAsync(req: Request, res: Response, next: NextFunction) {
    printingEditionService.createAsync(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
     }

export async function removeAsync(req: Request, res: Response, next: NextFunction) {
    printingEditionService.removeAsync(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
     }

export async function updateAsync(req: Request, res: Response, next: NextFunction) {
    printingEditionService.updateAsync(req.body.printingEdition,req.body._id)
        .then(users => res.json(users))
        .catch(err => next(err));
    }

export async function getPrintingEditionsForAdminHandlerAsync(req: Request, res: Response, next: NextFunction) {
    printingEditionService.getPrintingEditionsAsync(req.body)
        .then(users => res.json(users))
        .catch(err => next(err));
    }
