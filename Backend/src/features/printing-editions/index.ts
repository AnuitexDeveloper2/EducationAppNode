import { Router } from "express";
import {createAsync,removeAsync,updateAsync,getPrintingEditionsForAdminHandlerAsync} from "./handlers/printing-edition.handler.admin";
import { getPrintingEditionsForUserHandlerAsync, getPrintingEditionById } from "./handlers/printing-edition.handler.user";
import { checkPermission } from "../shared/accessControle/accessController";
import { Role } from "../shared/enums/role";

export const adminProductRouter =  Router();

//adminProductRouter.use(checkPermission(Role.Admin));

adminProductRouter.post('/create', createAsync);
adminProductRouter.post('/remove', removeAsync);
adminProductRouter.post('/update', updateAsync);
adminProductRouter.post('/', getPrintingEditionsForAdminHandlerAsync);

export const userProductRouter = Router();

//userProductRouter.use( checkPermission(Role.User));

userProductRouter.get('/', getPrintingEditionsForUserHandlerAsync);
userProductRouter.get('/:id', getPrintingEditionById);