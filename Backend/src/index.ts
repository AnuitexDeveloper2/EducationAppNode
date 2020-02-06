import express, {Application, Request, Response, NextFunction, Router} from 'express';
import mongoose from 'mongoose';
import { Init } from "../src/features/shared/repositories/Initial";
import  userModel  from "./features/shared/db-models/user";
import bodyParser from 'body-parser';
import { userRouter } from "../src/features/user/handlers/userHandler";


const app: Application = express();
const init = Init.prototype;
init.Check(userModel);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/user',userRouter);

mongoose.connect("mongodb://localhost/educationdb", { useCreateIndex: true, useNewUrlParser: true })


app.listen(8000, () => console.log('server running'))