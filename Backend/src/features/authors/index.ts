import Router from 'express';
import {createAsync,removeAsync,updateAsync,getAuthorsAsync} from './handlers/authorHandler'
import { checkPermission } from '../shared/accessControle/accessController';
import { Role } from '../shared/enums/role';

export const authorRouter = Router();

authorRouter.use(checkPermission(Role.Admin))

authorRouter.post('/create', createAsync);
authorRouter.delete('/:id', removeAsync);
authorRouter.post('/update', updateAsync);
authorRouter.get('/', getAuthorsAsync);