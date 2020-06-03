import { Router } from "express";
import { getProfile as getProfile, edit, changePassword } from "./handlers/user.handler.user";
import { getAll, remove, getUsers, blockUser } from "./handlers/user.handler.admin";
import { checkPermission } from "../shared/accessControle/accessController";
import { Role } from "../shared/enums/role";

export const userRouter = Router();

userRouter.use(checkPermission(Role.User))
userRouter.post('/me', getProfile);
userRouter.post('/edit', edit);
userRouter.post('/editPassword', changePassword)

export const adminRouter = Router();

adminRouter.use(checkPermission(Role["Admin"]))
adminRouter.post('/getAll', getAll);
adminRouter.post('/remove', remove);
adminRouter.post('/', getUsers);
adminRouter.post('/block', blockUser)