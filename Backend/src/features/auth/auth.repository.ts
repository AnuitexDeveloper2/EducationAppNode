import { User } from "../user/api";
import userModel from "../shared/db-models/user";
import bcrypt from "bcryptjs";
import { Role } from "../shared/enums/role";
import * as userRepository from "../user/repositories/userRepositiry"
import jwt from 'jsonwebtoken';


export async function registerAsync (userParam: User): Promise<boolean> {
      
    let checkUser = await userModel.findOne({email: userParam.email})
    console.log(userParam);
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


export async function signInAsync(userParam: userModel): Promise<string> {
    let res = await userModel.findById(userParam._id)
    let user = await userModel.findOne({ email: userParam.email })
    if (user == null) {
       return "false";
    }

    const result = await userRepository.checkPasswordAsync(userParam.passwordHash,user);
    if (!result) {
       return "false";
    }

    const secret: any = process.env.secret;
    const token = jwt.sign({ sub: user.id, role: Role[user.role] }, secret, {expiresIn: '1h'});
    return token;
}