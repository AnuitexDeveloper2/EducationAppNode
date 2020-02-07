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

    export async function signInAsync(userParam: userModel): Promise<boolean> {
        let res = await userModel.findById(userParam._id)
        let user = await userModel.findOne({ email: userParam.email })
        if (user == null) {
           return false;
        }
    
        const result = await checkPasswordAsync(userParam.passwordHash,user);
        if (!result) {
           return false;
        }
    
        const token = jwt.sign({ sub: user.id, role: Role[user.role] }, config.secret, {expiresIn: '1h'});
        return true;
    }
    
    async function checkPasswordAsync(password: string, user: User) {
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return false
        }
        return true;
    }

    export async function editAsync(userParam: User, user:userModel): Promise<boolean> {
    
        Object.assign(user, userParam);
    
        let result =  await user.save();
    
        if (result == null) {
          false;
        }
    
        return true;;
    }

    export async function removeOneAsync(userParam: userModel) {
        let user = await userModel.findById(userParam);
        
        if (user == null) {
            throw Error.userNotFound
        }

        let result = await userModel.findByIdAndRemove(userParam._id)
        console.log(result);
    }

    export async function findByEmail(email: string): Promise<boolean> {
       let user = await userModel.findOne({ email: email });
       if (user == null) {
           return false;
       }
        return true;
    }

    export async function findById(id: string) {
      
        return await userModel.findById(id);
    }

    export async function findByUserName(userName: string) {

        let result = await userModel.findOne({userName: userName})
        if (result == null) {
            return false;
        }
         return true;
    }

