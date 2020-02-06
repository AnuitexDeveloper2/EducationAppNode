import userModel  from "../../shared/db-models/user";
import {User} from"../api";
import bcrypt from "bcryptjs";
import {Error} from '../../shared/constants/error';
import jwt from 'jsonwebtoken';
const config = require('../../../../config')
   export async function getUser (userParam: User)  {
    let result = await userModel.findOne({email: userParam.email})
        if (result == null) {
            throw Error.userNotFound;
        }
        return result;
    };

    export async function register (userParam: User): Promise<boolean> {
       
      
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

    export async function signIn(userParam: User) {

        let user = await userModel.findOne({ email: userParam.email })
        if (user == null) {
            throw Error.userNotFound;
        }
    
        console.log(userParam.passwordHash);
        const result = await checkPasswordAsync(userParam.passwordHash,user);
        if (!result) {
            throw Error.userNotFound;
        }
    
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
    
        console.log(token);
        return token;
    
    }
    
    async function checkPasswordAsync(password: string, user: User) {
        if (!bcrypt.compareSync(password, user.passwordHash)) {
            return false
        }
        return true;
    }

