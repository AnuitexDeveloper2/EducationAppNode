import { User } from "../user/api";
import * as repository from "../auth/auth.repository";
import { validateWithJsonSchema } from "../utils/validateWithJsonSchema";
import authValidateSchema from "./operations/RegisterRequest.schema.json";
import logInVlidateSchema from "./operations/LogInRequest.schema.json";
import logger from "../utils/logger";
import { generateTokens } from "./jwtHelper/jwtHelper";
import userModel from "../../dataAccess/entityModels/user";
import  idValidateSchema  from '../utils/IdRequest.schema.json'
import { updateOneAsync } from "../user/repositories/userRepositiry";


export async function registerAsync(userParam: User): Promise<any> {
    const validateResult = validateWithJsonSchema(userParam,authValidateSchema);
    logger.info(`>>>> authService.register(), with: user = ${JSON.stringify(userParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> authService.register(), invalid data = ${validateResult.errors}`);
        return {message:"Register parameter did not valid", error: validateResult.errors};
    }
    
    const result = await repository.registerAsync(userParam);
    if (!result) {
        logger.error(`>>>> authService.register(), result = ${result}`);
        return false
    }

    return result;
}


export async function logInAsync(email: string, password: string): Promise<any> {
    const validateModel = {email: email, password: password}
    const validateResult = validateWithJsonSchema(validateModel,logInVlidateSchema);
    logger.info(`>>>> authService.logIn(), with: model = ${JSON.stringify(validateModel)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> authService.logIn(), invalid data = ${validateResult.errors}`);
        return {message:"LogIn parameters did not valid", error: validateResult.errors};
    }
    const result = await repository.signInAsync(email,password);
    const test = typeof(result)

    if (test == "string") {
        logger.error(`>>>> authService.logIn(), result = ${result}`);
        return false;
    }
    return  generateTokens(result);
}

export async function confirmedEmailAsync(id: string): Promise<any> {
    console.log(id)
    const validateResult = validateWithJsonSchema(id,idValidateSchema);
    logger.info(`>>>> authService.confirmedEmail(), with: user id = ${JSON.stringify(id)}`);
    
    if (!validateResult.valid) {
        logger.error(`>>>> authService.confirmedEmail(), invalid data = ${JSON.stringify(id)}`);
        return {message: "Invalid id parameter", error: validateResult.errors};
    }
    const property ={confirmedEmai: true}
    const result = await updateOneAsync(id,property);
    if(!result) {
        return "user not found";
    }

    return result;
}

export async function oAuth(userParam: userModel) {
    const validateResult = validateWithJsonSchema(userParam,authValidateSchema);
    logger.info(`>>>> authService.oAuth(), with: user = ${JSON.stringify(userParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> authService.oAuth(), invalid data = ${validateResult.errors}`);
        return {message:"Register parameter did not valid", error: validateResult.errors};
    }

    const result = await repository.signInOAuthAsync(userParam)
    if (result === null) {
        return false
    }
    return generateTokens(result)
}
