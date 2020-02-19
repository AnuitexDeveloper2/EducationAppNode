import { Router } from "express";
import {createAsync,removeAsync,updateAsync,getPrintingEditionForAdminHandlerAsync} from "../printing-editions/handlers/printingEditionHandler";

export const adminProductRouter =  Router();

adminProductRouter.post('/create', createAsync);
adminProductRouter.delete('/:id', removeAsync);
adminProductRouter.post('/update', updateAsync);
adminProductRouter.get('/', getPrintingEditionForAdminHandlerAsync);

export const userProductRouter = Router();
