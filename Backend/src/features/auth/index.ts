import { Router } from "express";
import { authenticate, register, refreshTokens, oAuht, confirmEmail } from "../auth/auth.handlers";

export const authRouter = Router();

authRouter.post('/logIn', authenticate);
authRouter.post('/register', register);
authRouter.post('/refreshTokens', refreshTokens)
authRouter.post('/oAuth', oAuht)
authRouter.post('/confirmedEmail', confirmEmail)

