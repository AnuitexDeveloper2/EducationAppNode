import Router from 'express';
import {createAsync,removeAsync,updateAsync,getAuthorsAsync} from './handlers/authorHandler'

export const authorRouter = Router();

authorRouter.post('/create', createAsync);
authorRouter.delete('/:id', removeAsync);
authorRouter.post('/update', updateAsync);
authorRouter.get('/authors', getAuthorsAsync);