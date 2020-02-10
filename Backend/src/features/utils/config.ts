import * as dotenv from "dotenv";



dotenv.config({ path: '../process.env' });

export const APP_ID = process.env.NODE_ENV;
export const LOG_LEVEL = process.env.LOG_LEVEL;