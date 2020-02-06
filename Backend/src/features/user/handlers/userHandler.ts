import { Request, Response, Router, NextFunction } from "express";
import * as userService from ".././services/userService"

export const userRouter =  Router();

userRouter.post('/register', register);
userRouter.get('/me', getUser);
userRouter.get('/getAll', getAll);
userRouter.post('/logIn', authenticate);

export async function register(req: Request,res: Response,next: NextFunction) {
   
  let result = await userService.registerAsync(req.body)
  .then(() => res.json({}))
  .catch(err => next(err))
  res.send()
}

export async function getUser(req: Request,res: Response,next: NextFunction) {

  await userService.getByIdAsync(req.body)
  .then((user) =>res.json({user}))
  .catch(err =>next(err))

}

export async function getAll(req: Request, res: Response, next: NextFunction) {

  userService.getAllAsync()
            .then(users => res.json(users))
            .catch(err => next(err));
}

export async function authenticate(req: Request, res: Response, next: NextFunction) {
  userService.logIn(req.body)
  .then(token => res.json(token))
  .catch(err => next(err));
}