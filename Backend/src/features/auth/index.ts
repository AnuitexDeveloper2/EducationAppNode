import {Router} from "express";
import {authenticateAsync,registerAsync,changePasswordAsync} from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticateAsync);
authRouter.post('/register', registerAsync);
authRouter.post("/change-password", changePasswordAsync);
