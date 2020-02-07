import * as repository from '../repositories/userRepositiry'
import {User} from "../api";
import userModel from '../../shared/db-models/user';

export async function registerAsync(userModel: User): Promise<string> {
   
    const result = await repository.registerAsync(userModel)
    if (!result) {
        throw 'No register User';
    }
    return 'register succeed';
}

export async function getByIdAsync(userParam: User): Promise<User> {
   
    let result = await repository.getUserAsync(userParam)

    return result;
      
   
}

export async function getAllAsync() {
    return await userModel.find().select('-hash');
}

export async function logInAsync(userParam: userModel) {
    if (userParam.email === null || userParam.passwordHash === null) {
        return null;
    }
   return await repository.signInAsync(userParam)
}

export async function editAsync(userParam: userModel) {
    
    return await repository.editAsync(userParam)
}
