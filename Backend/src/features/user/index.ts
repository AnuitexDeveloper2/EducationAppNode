import { Router } from "express";
import {getProfileAsync,editAsync,getAllAsync,removeAsync,getUsersAsync} from "../user/handlers/userHandler";

export const userRouter = Router();

userRouter.get('/me', getProfileAsync);
userRouter.get('/edit', editAsync);

export const adminRouter = Router();

adminRouter.post('/getAll', getAllAsync);
adminRouter.post('/remove',removeAsync);
adminRouter.get('/users', getUsersAsync);