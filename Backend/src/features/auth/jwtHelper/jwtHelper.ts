import userModel from "../../../dataAccess/entityModels/user";
import jwt from 'jsonwebtoken';
import { Response, Request, NextFunction } from 'express';
import { Role } from "../../shared/enums/role";
import logger from "../../utils/logger";

let currentRole;

export const generateTokens = (userModel: userModel) => {
  if (userModel == null) {
    return userModel;
  }
  const user = {
    "role": userModel.role,
    "id": userModel._id
  }

  const accessToken = jwt.sign(user, process.env.SECRET, { expiresIn: process.env.ACCEESS_TOKEN_LIFE });

  const refreshToken = jwt.sign(user, process.env.REFRESH_TOKEN_SECRET, { expiresIn: process.env.REFRESH_TOKEN_LIFE })

  const respons = {
    result: true,
    "AccessToken": accessToken,
    "RefreshToken": refreshToken,
    "User": userModel
  }
  return respons;
}

export const checkJwt = (req: Request, res: Response, next: NextFunction) => {
  const accessToken = <string>req.headers["accesstoken"];
  let jwtPayload;
  let newTokens: any;
  try {
    jwtPayload = <any>jwt.verify(accessToken, process.env.SECRET);
    currentRole = jwtPayload.role;

    res.locals.jwtPayload = jwtPayload;

  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      logger.info(`>>>> JWTHelper.checkJWT, with user err.name = ${JSON.stringify(err.name)}`);
      res.status(403).send("access Token Expired")
    }
    if (err.name == 'JsonWebTokenError') {
      logger.info(`>>>> JWTHelper.checkJWT, with user err.name = ${JSON.stringify(err.name)}`);
      res.status(401).send("token is not valid");
    }
  }
  next()
};

export async function refreshTokens(res: Response, req: Request) {
  let jwtPayload;
  try {
    jwtPayload = <any>jwt.verify(<string>req.body.refreshToken, process.env.REFRESH_TOKEN_SECRET);
  } catch (err) {
    if (err.name == 'TokenExpiredError') {
      logger.info(`>>>> JWTHelper.refreshToken(), with user err.name = ${JSON.stringify(err.name)}`);
      res.status(401).send('refresh token is not valid');
    }
  }
  const user = new userModel();
  user._id = jwtPayload._id;
  user.role = jwtPayload.role;
  return generateTokens(user);
}
