import { Router } from "express";
import { authenticateAsync,registerAsync } from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticateAsync);
authRouter.post('/register', registerAsync);

