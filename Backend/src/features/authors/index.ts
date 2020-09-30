import Router from 'express';
import { create, remove, update, getAuthors, getAll } from './handlers/authorHandler'
import { checkPermission } from '../shared/accessControle/accessController';
import { Role } from '../shared/enums/role';


export const authorRouter = Router();

// authorRouter.use(checkPermission(Role.Admin))

authorRouter.post('/create', create);
authorRouter.post('/delete', remove);
authorRouter.post('/update', update);
authorRouter.post('/', getAuthors);
authorRouter.post('/get', getAll)