import express, {Application} from 'express';
import { Init } from "../src/features/shared/repositories/Initial";
import bodyParser from 'body-parser';
import { userRouter,adminRouter } from "../src/features/user/index";
import { authorRouter } from "../src/features/authors/index";
import { authRouter } from './features/auth';
import * as env from 'dotenv';
import {errorMiddleware} from './features/shared/middleware/errorMiddleware';
import { checkJwt } from './features/auth/jwtHelper/jwtHelper';
import { grantAccess } from './features/shared/accessControle/accessController';
import { Role } from './features/shared/enums/role';
import { productRouter } from './features/printing-editions';
import  {connectdb}  from '../src/dataAccess/database/connectdb';
import * as swaggerDocument from "./swagger.json";
import swaggerUi from 'swagger-ui-express';

env.config();

const app: Application = express();
const init = Init.prototype;
init.Check();
app.use(errorMiddleware);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors())
app.use('/auth', authRouter)
console.log("first")
app.use(checkJwt);
app.use('/admin/printing-edition',grantAccess(Role.Admin), productRouter)
app.use('/admin/author',grantAccess(Role.Admin), authorRouter);
app.use('/user',grantAccess(Role.User), userRouter);
app.use('/admin',grantAccess(Role.Admin), adminRouter);


connectdb();

const PORT = process.env.PORT || 8080;
process.env.connectionString
app.listen(PORT, () => {
 app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
});
