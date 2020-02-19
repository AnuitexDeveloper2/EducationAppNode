import { Router } from 'express';
import { createOrderAsync, getOrderForUserAsync } from "./handlers/order.user.handler";
import {  getOrdersAsync } from './handlers/order.admin.handler';

export const orderUserRouter = Router();

orderUserRouter.post('/', createOrderAsync);
orderUserRouter.get('/:id', getOrderForUserAsync)

export const orderAdminRouter = Router();

orderAdminRouter.get('/', getOrdersAsync)