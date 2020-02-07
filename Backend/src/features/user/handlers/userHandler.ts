import { Request, Response, Router, NextFunction } from "express";
import * as userService from ".././services/userService"

export const userRouter =  Router();
userRouter.post('/register', registerAsync);
userRouter.get('/me', getUserAsync);
userRouter.post('/logIn', authenticateAsync);
userRouter.get('/edit', editAsync);

export const adminRouter = Router();

adminRouter.get('/getAll', getAllAsync);
adminRouter.post('/remove', removeAsync);

export async function registerAsync(req: Request,res: Response,next: NextFunction) {
   
  let result = await userService.registerAsync(req.body)
  .then((err) => res.json({err}))
  .catch(err => next(err))
}

export async function getUserAsync(req: Request,res: Response,next: NextFunction) {

  await userService.getByIdAsync(req.body)
  .then((user) =>res.json({user}))
  .catch(err =>next(err))

}

export async function getAllAsync(req: Request, res: Response, next: NextFunction) {

  userService.getAllAsync()
            .then(users => res.json(users))
            .catch(err => next(err));
}

export async function authenticateAsync(req: Request, res: Response, next: NextFunction) {
  userService.logInAsync(req.body)
  .then(token => res.json(token))
  .catch(err => next(err));

}

export function editAsync(req: Request, res: Response, next: NextFunction) {
  
  userService.editAsync(req.body)
      .then((err) => res.json({err}))
      .catch(err => next(err));
}

export function removeAsync(req: Request, res: Response, next: NextFunction) {
  
  userService.removeAsync(req.body)
      .then(() => res.json({}))
      .catch(err => next(err));
}