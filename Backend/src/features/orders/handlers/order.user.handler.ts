import { Request, Response, NextFunction } from 'express';
import * as orderService from "../services/orderService"

export async function createOrderAsync(req: Request, res: Response, next: NextFunction) {
     await orderService.createOrderAsync(req.body)
     .then((err) => res.json(err))
    .catch(err => next(err));
   }
 
   export async function getOrderForUserAsync(req: Request, res: Response, next: NextFunction) {
       await orderService.getOrdersForUserAsync(req.body)
       .then((err)=> res.json(err))
       .catch(err => next(err));
   }