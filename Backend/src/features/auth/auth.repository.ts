import { User } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import bcrypt from "bcryptjs";
import * as userRepository from "../user/repositories/userRepositiry"


export async function registerAsync (userParam: User): Promise<boolean> {
    let checkUser = await userModel.findOne({email: userParam.email})

    if (checkUser != null) {
        false
    }

    let user = new userModel(userParam);
    var salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, salt);
    let result = await userModel.create(user)

    if (result == null) {
    return false;
        }
     return true;
}

export async function signInAsync(userParam: userModel): Promise<userModel> {
    let user = await userModel.findOne({ email: userParam.email })
    if (user == null) {
      
        return null; 
    }
    const result = await userRepository.checkPasswordAsync(userParam.passwordHash,user);
    if (!result) {
       return user;
    }
      return user ;
}