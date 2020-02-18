import { User } from "../user/api";
import userModel from "../../dataAccess/entityModels/user";
import bcrypt from "bcryptjs";
import * as userRepository from "../user/repositories/userRepositiry"


export async function registerAsync (userParam: User): Promise<any> {
    let checkUser = await userModel.findOne({email: userParam.email})

    if (checkUser != null) {
        false
    }

    let user = new userModel(userParam);
    var salt = bcrypt.genSaltSync(10);
    user.passwordHash = bcrypt.hashSync(userParam.passwordHash, salt);
    try {
        let result = await userModel.create(user)
    } catch (error) {
        console.log(error.errmsg)
        return error.errmsg  
    }

    
     return true;
}

export async function signInAsync(email: string, password: string): Promise<userModel> {
    let user = await userModel.findOne({ email: email })
    if (user == null) {
      
        return null; 
    }
    const result = await userRepository.checkPasswordAsync(password,user);
    if (!result) {
       return user;
    }
      return user ;
}