import { User } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import bcrypt from "bcrypt";
import * as userRepository from "../user/repositories/userRepositiry"
import oAuthClient from "../../dataAccess/entityModels/userLogins";
import { OAuthModel } from "../user/api"
import { sendingEmail } from "./emailHelper/emailHelper";
import logger from "../utils/logger";
import { ResponseModel } from "../shared/models/baseResponse";

let responseModel: ResponseModel

export async function register(userParam: User): Promise<ResponseModel> {
    let result;

    const checkUser = await userModel.findOne({ email: userParam.email })
    if (checkUser != null) {
        responseModel = { result: false, error: "This email already exist" }
        return responseModel
    }
    let user = new userModel(userParam);
    const salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, salt);
    try {
        result = await userModel.create(user)
    } catch (error) {
        logger.error(error)
        if (result === null) {
            responseModel = { result: false, error: error }
            return responseModel
        }
    }
    const isSent = sendingEmail(result)
    return responseModel = { result: true, error: null };
}

export async function signIn(email: string, password: string): Promise<any> {
    let user = await userModel.findOne({ email: email })

    if (user == null) {
        return responseModel = { error: "user is not found", result: false };
    }

    return user;
}

export async function signInOAuth(userParam: any) {
    const user = await userModel.findOne({ email: userParam.email })

    if (user !== null) {
        return user
    }
    const client = await userModel.create(userParam)
    const clientParam: OAuthModel = { user_Id: client._id }
    const oauthClient = await oAuthClient.create(clientParam)
    return client
}

