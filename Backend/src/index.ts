import express, {Application} from 'express';
import { Init } from "./features/shared/repositories/Initial";
import bodyParser from 'body-parser';
import { userRouter,adminRouter } from "./features/user/index";
import { authorRouter } from "./features/authors/index";
import { authRouter } from './features/auth';
import * as env from 'dotenv';
import { checkJwt } from './features/auth/jwtHelper/jwtHelper';
import { adminProductRouter, userProductRouter } from './features/printing-editions';
import  {connectdb}  from './dataAccess/database/connectdb';
import * as swaggerDocument from "./swagger.json";
import swaggerUi from 'swagger-ui-express';
import logger from './features/utils/logger';
import { orderUserRouter, orderAdminRouter } from './features/orders';
import  cors  from "cors";

env.config();
const app: Application = express();


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors())
app.use('/auth', authRouter)
app.use('/home', userProductRouter)
app.use(checkJwt);
app.use('/order', orderUserRouter)
app.use('/admin/order', orderAdminRouter)
app.use('/admin/printing-edition', adminProductRouter)
app.use('/admin/author', authorRouter);
app.use('/user', userRouter);
app.use('/admin/user', adminRouter);
console.log(process.env.NODE_ENV)
connectdb();

const PORT = process.env.PORT || 8080;
process.env.connectionString
app.listen(PORT, () => {
app.use('/swagger',swaggerUi.serve,swaggerUi.setup(swaggerDocument));
logger.info(`server started listening on port ${PORT}`);
});