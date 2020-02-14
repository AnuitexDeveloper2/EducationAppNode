import { User, ResetPassword } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import * as repository from "../auth/auth.repository";
import { Error } from "../shared/constants/error";
import * as userRepository from "../user/repositories/userRepositiry"

export async function registerAsync(userParam: User): Promise<Array<string>> {

    let model = new userModel();
    model.error = new Array<string>();
    let wasExist = await userRepository.findByEmail(userParam.email);
    
    if (wasExist) {
        model.error.push(Error.Email + userParam.email + Error.IsAlreadyTaken);
        return model.error;
    }
    
    wasExist = await userRepository.findByUserName(userParam.userName);
    
    if (wasExist) {
        model.error.push(Error.UserName + userParam.email + Error.IsAlreadyTaken);
        return model.error;
    }

    const result = await repository.registerAsync(userParam)
    return userParam.error;
}


export async function logInAsync(userParam: userModel): Promise<userModel> {
    
    if (userParam == null) {
        return userParam;
    }
    
    let result = await repository.signInAsync(userParam);
    return  result
}

export async function changePasswordAsync(userParam: ResetPassword) {
    return 'Yes mother facker';
}