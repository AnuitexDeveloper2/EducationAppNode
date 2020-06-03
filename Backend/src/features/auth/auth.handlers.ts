import { Request, Response, NextFunction } from "express";
import * as authService from '../auth/auth.service';
import * as jwtHelper from "./jwtHelper/jwtHelper";

export async function register(req: Request, res: Response) {

  await authService.register(req.body.user)
    .then((response) => res.json(response))
    .catch()
}

export async function authenticate(req: Request, res: Response) {
  await authService.logIn(req.body.email, req.body.password)
    .then(user => res.send(user))
    .catch();
}

export async function confirmEmail(req: Request, res: Response) {
  await authService.confirmedEmail(req.body)
    .then((user) => res.send(user))
    .catch();
}

export async function refreshTokens(req: Request, res: Response) {
  jwtHelper.refreshTokens(res, req).then((err) => res.json(err))
}

export async function oAuht(req: Request, res: Response) {
  await authService.oAuth(req.body)
    .then(user => res.send(user))
    .catch();
}
