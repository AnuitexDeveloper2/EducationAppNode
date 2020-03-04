import { Router } from "express";
import { authenticateAsync,registerAsync, confirmEmailAsync, refreshTokens, oAuht, oAuhtCallback } from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticateAsync);
authRouter.post('/register', registerAsync);
authRouter.post('/email', confirmEmailAsync)
authRouter.post('/refreshTokens', refreshTokens)
authRouter.get('/OAuth', oAuht)
authRouter.get('/callback',oAuhtCallback)

