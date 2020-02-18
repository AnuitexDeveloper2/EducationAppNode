import {Router} from "express";
import * as authHandlers from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authHandlers.authenticateAsync);
authRouter.post('/register', authHandlers.registerAsync);
authRouter.post("/change-password", authHandlers.changePasswordAsync);
