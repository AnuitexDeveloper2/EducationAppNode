import { Request, Response, NextFunction } from 'express';
import * as orderService from "../services/orderService"

export async function getOrdersAsync(req: Request, res: Response, next: NextFunction) {
     await orderService.getOrdersForAdminAsync(req.body)
     .then((err) => res.json({err}))
    .catch(err => next(err))
   }

