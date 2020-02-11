import express, {Application} from 'express';
import mongoose from 'mongoose';
import { Init } from "../src/features/shared/repositories/Initial";
import bodyParser from 'body-parser';
import { userRouter,adminRouter } from "../src/features/user/index";
import { authRouter } from './features/auth';
import * as env from 'dotenv';
import * as cors from 'cors';
import errorMiddleware from './features/shared/middleware/errorMiddleware';

env.config();

const app: Application = express();
const init = Init.prototype;
init.Check();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use(cors())

app.use('/user', userRouter);
app.use('/admin', adminRouter);
app.use('/auth', authRouter);

const connectionString: any = process.env.connectionString;
mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true })


app.use(errorMiddleware);
const PORT = process.env.PORT || 8080;
process.env.connectionString
app.listen(PORT, () => {
  console.log(`Server is listening on port: ${PORT}`);
});
