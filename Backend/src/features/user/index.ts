import { Router } from "express";
import {getProfileAsync, editAsync, changePassword } from "./handlers/user.handler.user";
import { getAllAsync,removeAsync, getUsersAsync } from "./handlers/user.handler.admin";
import { checkPermission } from "../shared/accessControle/accessController";
import { Role } from "../shared/enums/role";

export const userRouter = Router();

//userRouter.use(checkPermission(Role.User))
userRouter.get('/me', getProfileAsync);
userRouter.post('/edit', editAsync);
userRouter.post('/editPassword', changePassword)

export const adminRouter = Router();

adminRouter.use(checkPermission(Role.Admin))
adminRouter.post('/getAll', getAllAsync);
adminRouter.delete('/remove',removeAsync);
adminRouter.get('/', getUsersAsync);