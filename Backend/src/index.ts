import express, {Application, Request, Response, NextFunction} from 'express';
import mongoose from 'mongoose';
import { usersSchema } from "../src/features/shared/db-models/user";
import { admin } from "../src/features/shared/repositories/Initial";

const app: Application = express();
const init = admin;

mongoose.connect("mongodb://localhost/educationdb", { useCreateIndex: true, useNewUrlParser: true })
.then(db=>console.log('connection!!!'));

app.get('/',(req: Request, res: Response, next: NextFunction)=> {
    res.send('Server works');
});



app.listen(8000, () => console.log('server running'))