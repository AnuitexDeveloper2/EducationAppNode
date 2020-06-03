import { Request, Response, NextFunction } from 'express';
import * as orderService from "../services/orderService"

export async function createOrder(req: Request, res: Response, next: NextFunction) {
    await orderService.createOrder(req.body)
        .then((err) => res.json(err))
        .catch(err => next(err));
}

export async function getOrderForUser(req: Request, res: Response, next: NextFunction) {
    await orderService.getOrdersForUser(req.body)
        .then((err) => res.json(err))
        .catch(err => next(err));
}