import * as env from 'dotenv';
import mongoose from 'mongoose';

env.config();


const connectionString = process.env.CONNECTION_STRING;
export function connectdb() {
       mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true })
       // mongoose.set('debug',true)
}
