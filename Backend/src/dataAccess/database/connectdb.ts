import * as env from 'dotenv';
import mongoose from 'mongoose';

env.config();


const connectionString = process.env.connectionString;
export async  function connectdb() {
       mongoose.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true })
      
 
}  
    