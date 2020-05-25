import { User } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import bcrypt from "bcrypt";
import * as userRepository from "../user/repositories/userRepositiry"
import oAuthClient from "../../dataAccess/entityModels/userLogins";
import {OAuthModel} from "../user/api"
import { sendingEmail } from "./emailHelper/emailHelper";

export async function registerAsync (userParam: User): Promise<boolean> {
    const checkUser = await userModel.findOne({email: userParam.email})
    if (checkUser != null) {
        false
    }
    let user = new userModel(userParam);
    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, salt);
    let result = await userModel.create(user)
    
    if (result === null) {
        return false
    }
    const isSent = sendingEmail(result)
     return true;
}

export async function signInAsync(email: string, password: string): Promise<any> {
    let user = await userModel.findOne({ email: email })

    if (user == null) {
        return "user is not found"; 
    }
    
      return user ;
}

export async function signInOAuthAsync(userParam: any) {
    const user = await userModel.findOne({ email: userParam.email })

    if (user!==null) {
        return user
    }
    const client = await userModel.create(userParam)
    const clientParam: OAuthModel ={user_Id: client._id}
    const oauthClient = await oAuthClient.create(clientParam)
    return client
}

