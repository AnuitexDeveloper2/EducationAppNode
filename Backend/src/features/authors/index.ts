import Router from 'express';
import * as authorHendler from './handlers/authorHandler'

export const authorRouter = Router();

authorRouter.post('/create', authorHendler.createAsync);
authorRouter.delete('/:id', authorHendler.removeAsync);
authorRouter.post('/update', authorHendler.updateAsync);
authorRouter.get('/authors', authorHendler.getAuthorsAsync);