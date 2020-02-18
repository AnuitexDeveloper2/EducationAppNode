import { User, ResetPassword } from "../user/api";
import * as repository from "../auth/auth.repository";
import { validateWithJsonSchema } from "../utils/validateWithJsonSchema";
import authValidateSchema from "./operations/RegisterRequest.schema.json";
import logInVlidateSchema from "./operations/LogInRequest.schema.json";

export async function registerAsync(userParam: User): Promise<any> {

    const validateResult = validateWithJsonSchema(userParam,authValidateSchema)
    console.log(validateResult.valid)
    if (!validateResult.valid) {
        return {message:"Register parameter did not valid", error: validateResult.errors}
    }
    
    const result = await repository.registerAsync(userParam)
    return result;
}


export async function logInAsync(email: string, password: string): Promise<any> {
    const model = {email: email, passwordHash: password}
    const validateResult = validateWithJsonSchema(model,logInVlidateSchema);
    if (!validateResult.valid) {
        return {message:"LogIn parameters did not valid", error: validateResult.errors};
    }
    
    let result = await repository.signInAsync(email,password);
    return  result
}

export async function changePasswordAsync(userParam: ResetPassword) {
    return 'Yes mother facker';
}