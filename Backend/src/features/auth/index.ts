import {Router} from "express";
import * as authHandlers from "../auth/auth.handlers";
import { checkJwt } from "../shared/jwtHelper/checkJwt";

export const authRouter = Router();

authRouter.post('/logIn', authHandlers.authenticateAsync);
authRouter.post('/register', authHandlers.registerAsync);
authRouter.post("/change-password", [checkJwt], authHandlers.changePasswordAsync);
