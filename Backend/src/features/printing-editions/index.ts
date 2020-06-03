import { Router } from "express";
import { create, remove, update, getPrintingEditionsForAdmin } from "./handlers/printing-edition.handler.admin";
import { getPrintingEditionsForUser, getPrintingEditionById } from "./handlers/printing-edition.handler.user";
import { checkPermission } from "../shared/accessControle/accessController";
import { Role } from "../shared/enums/role";

export const adminProductRouter = Router();

adminProductRouter.use(checkPermission(Role.Admin));

adminProductRouter.post('/create', create);
adminProductRouter.post('/remove', remove);
adminProductRouter.post('/update', update);
adminProductRouter.post('/', getPrintingEditionsForAdmin);

export const userProductRouter = Router();

userProductRouter.post('/', getPrintingEditionsForUser);
userProductRouter.get('/:id', getPrintingEditionById);