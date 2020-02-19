import express, {Application} from 'express';
import { Init } from "../src/features/shared/repositories/Initial";
import bodyParser from 'body-parser';
import { userRouter,adminRouter } from "../src/features/user/index";
import { authorRouter } from "../src/features/authors/index";
import { authRouter } from './features/auth';
import * as env from 'dotenv';
import { checkJwt } from './features/auth/jwtHelper/jwtHelper';
import { checkPermission } from './features/shared/accessControle/accessController';
import { Role } from './features/shared/enums/role';
import { adminProductRouter } from './features/printing-editions';
import  {connectdb}  from '../src/dataAccess/database/connectdb';
import * as swaggerDocument from "./swagger.json";
import swaggerUi from 'swagger-ui-express';
import logger from './features/utils/logger';
import { orderUserRouter } from './features/orders';

env.config();

const app: Application = express();
const init = Init.prototype;
init.Check();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors())
app.use('/order',orderUserRouter)
app.use('/auth', authRouter)
app.use(checkJwt);
app.use('/admin/printing-edition',checkPermission(Role.Admin), adminProductRouter)
app.use('/admin/author',checkPermission(Role.Admin), authorRouter);
app.use('/user',checkPermission(Role.User), userRouter);
app.use('/admin',checkPermission(Role.Admin), adminRouter);


connectdb();

const PORT = process.env.PORT || 8080;
process.env.connectionString
app.listen(PORT, () => {
 app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
 logger.info(`server started listening on port ${PORT}`);
});
