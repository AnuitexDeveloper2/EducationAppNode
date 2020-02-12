import Router from 'express';
import * as authorHendler from './handlers/athorHandler'

export const authorRouter = Router();

authorRouter.post('/create',authorHendler.createAsync)