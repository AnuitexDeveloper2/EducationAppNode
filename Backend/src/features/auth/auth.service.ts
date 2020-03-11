import { User } from "../user/api";
import * as repository from "../auth/auth.repository";
import { validateWithJsonSchema } from "../utils/validateWithJsonSchema";
import authValidateSchema from "./operations/RegisterRequest.schema.json";
import logInVlidateSchema from "./operations/LogInRequest.schema.json";
import logger from "../utils/logger";
import { sendingEmail } from "./emailHelper/emailHelper";
import { findByEmail } from "../user/repositories/userRepositiry";
import { OauthOptions } from "../auth/oAuthHelper/oAuthHelper";

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
    }
    return result;
}


export async function logInAsync(email: string, password: string): Promise<any> {
    console.log(email)
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
        return null;
    }
    
    return  result;
}

export async function confirmEmailAsync(email: string): Promise<string> {
   
    const isEmailExist = await findByEmail(email)
    if (!isEmailExist) {
        logger.error(`>>>> authService.confirmEmail(), error  ${JSON.stringify(email)} has not been assigned to any user `)
        return "User Not Found"
    }
    
    const result = sendingEmail(isEmailExist);
    const error = typeof(result)

    if (error == "string") {
        logger.error(`>>>> autService.confirmEmail(), error = ${JSON.stringify(result)}`)
        return result;
    }
    return "email has been verified"
}

/*
export async function oAuth(name: string) {
    const token = OauthOptions.createToken('access token', 'optional refresh token', 'optional token type', { data: name });
    const test1 = await OauthOptions.code.getUri()
    OauthOptions.code.getToken()
    console.log(test1)
    return test1;
}
 */ 
//https://www.facebook.com/connect/login_success.html
export async function oAuthCallBack(code: string) {
    const uri = await OauthOptions.code.getUri()
    const response =  uri + JSON.stringify(code);
    return response
}
