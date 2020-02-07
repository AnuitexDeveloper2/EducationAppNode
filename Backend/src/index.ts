import express, {Application} from 'express';
import mongoose from 'mongoose';
import { Init } from "../src/features/shared/repositories/Initial";
import bodyParser from 'body-parser';
import { userRouter,adminRouter } from "../src/features/user/handlers/userHandler";


const app: Application = express();
const init = Init.prototype;
init.Check();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',userRouter);
app.use('/admin',adminRouter);

mongoose.connect("mongodb://localhost/educationdb", { useCreateIndex: true, useNewUrlParser: true })


app.listen(8000, () => console.log('server running'))