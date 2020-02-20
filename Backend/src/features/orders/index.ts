import { Router } from 'express';
import { createOrderAsync, getOrderForUserAsync } from "./handlers/order.user.handler";
import {  getOrdersAsync } from './handlers/order.admin.handler';
import { Role } from '../shared/enums/role';
import { checkPermission } from '../shared/accessControle/accessController';

export const orderUserRouter = Router();

orderUserRouter.use(checkPermission(Role.User))

orderUserRouter.post('/', createOrderAsync);
orderUserRouter.get('/:id', getOrderForUserAsync)

export const orderAdminRouter = Router();

orderAdminRouter.use(checkPermission(Role.Admin))

orderAdminRouter.get('/', getOrdersAsync)