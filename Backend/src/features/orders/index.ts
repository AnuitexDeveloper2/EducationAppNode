import { Router } from 'express';
import { createOrder, getOrderForUser } from "./handlers/order.user.handler";
import { getOrders } from './handlers/order.admin.handler';
import { Role } from '../shared/enums/role';
import { checkPermission } from '../shared/accessControle/accessController';

export const orderUserRouter = Router();

orderUserRouter.use(checkPermission(Role.User))

orderUserRouter.post('/', createOrder);
orderUserRouter.post('/myOrders', getOrderForUser)

export const orderAdminRouter = Router();

orderAdminRouter.use(checkPermission(Role.Admin))

orderAdminRouter.post('/', getOrders)