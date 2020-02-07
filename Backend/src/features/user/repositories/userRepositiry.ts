import userModel  from "../../shared/db-models/user";
import {User} from"../api";
import bcrypt from "bcryptjs";
import {Error} from '../../shared/constants/error';
import jwt from 'jsonwebtoken';
import { Role } from "../../shared/enums/role";
const config = require('../../../../config')
   

export async function getUserAsync (userParam: User)  {
    let result = await userModel.findOne({email: userParam.email})
        if (result == null) {
            throw Error.userNotFound;
        }
        return result;
    };

    export async function registerAsync (userParam: User): Promise<boolean> {
       
      
        let checkUser = await userModel.findOne({email: userParam.email})


        if (checkUser != null) {
            throw Error.emailExist;

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

    export async function signInAsync(userParam: userModel) {
        console.log(userParam._id);
        let res = await userModel.findById(userParam._id)
        console.log(res);
        let user = await userModel.findOne({ email: userParam.email })
        if (user == null) {
            throw Error.userNotFound;
        }
    
        const result = await checkPasswordAsync(userParam.passwordHash,user);
        if (!result) {
            throw Error.userNotFound;
        }
    
        const token = jwt.sign({ sub: user.id, role: Role[user.role] }, config.secret, {expiresIn: '1h'});

        return token;
    
    }
    
    async function checkPasswordAsync(password: string, user: User) {
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return false
        }
        return true;
    }

    export async function editAsync(userParam: userModel): Promise<userModel> {
        const user = await userModel.findById(userParam._id);
        if (user == null) {
            throw 'Not Found'
        }
    
        if (user.userName !== userParam.userName && await userModel.findOne({ userName: userParam.userName })) {
            throw Error.UserName + userParam.userName + Error.IsAlreadyTaken;
        }
    
        if (user.email !== userParam.email && await userModel.findOne({ email: userParam.email })) {
            throw Error.Email + userParam.email + Error.IsAlreadyTaken;
        }
    
        Object.assign(user, userParam);
    
        let result =  await user.save();
    
        if (result == null) {
           throw 'failed'
        }
    
        return result;
    }
