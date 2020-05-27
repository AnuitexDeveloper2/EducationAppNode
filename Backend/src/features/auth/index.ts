import { Router } from "express";
import { authenticateAsync,registerAsync, refreshTokens, oAuht, confirmEmailAsync } from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticateAsync);
authRouter.post('/register', registerAsync);
authRouter.post('/refreshTokens', refreshTokens)
authRouter.post('/oAuth',oAuht)
authRouter.post('/confirmedEmail', confirmEmailAsync )

