import { Router } from "express";
import { authenticateAsync,registerAsync, confirmEmailAsync, refreshTokens } from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticateAsync);
authRouter.post('/register', registerAsync);
authRouter.post('/email', confirmEmailAsync)
authRouter.post('/refreshTokens', refreshTokens)

