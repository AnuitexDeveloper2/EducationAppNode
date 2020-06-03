import { Request, Response, NextFunction } from 'express';
import * as orderService from "../services/orderService"

export async function getOrders(req: Request, res: Response, next: NextFunction) {
     await orderService.getOrdersForAdmin(req.body)
          .then((err) => res.json(err))
          .catch(err => next(err))
}

