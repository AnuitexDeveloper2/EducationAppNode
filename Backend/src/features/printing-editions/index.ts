import { Router } from "express";
import * as handler from "../printing-editions/handlers/printingEditionHandler";

export const productRouter =  Router();

productRouter.post('/create', handler.createAsync);
productRouter.delete('/:id', handler.removeAsync);
productRouter.post('/update', handler.updateAsync);
productRouter.get('/', handler.getPrintingEditionForAdminHandlerAsync);

export const userRouter = Router();