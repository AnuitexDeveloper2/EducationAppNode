import { Router } from "express";
import * as userHandlers from "../user/handlers/userHandler";
import {grantAccess} from "../shared/accessControle/accessController"
import { Role } from "../shared/enums/role";

export const userRouter = Router();

userRouter.get('/me', userHandlers.getUserAsync);
userRouter.get('/edit', userHandlers.editAsync);

export const adminRouter = Router();

adminRouter.post('/getAll', userHandlers.getAllAsync);
adminRouter.post('/remove', userHandlers.removeAsync);