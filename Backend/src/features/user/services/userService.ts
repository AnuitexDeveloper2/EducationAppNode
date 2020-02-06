import * as repository from '../repositories/userRepositiry'
import {User} from "../api";
import userModel from '../../shared/db-models/user';

export async function registerAsync(userModel: User): Promise<string> {
   
    const result = await repository.register(userModel)
    if (!result) {
        throw 'No register User';
    }

    return 'register succeed';
}

export async function getByIdAsync(userParam: User): Promise<User> {
   
    let result = await repository.getUser(userParam)

    return result;
      
   
}

export async function getAllAsync() {
    return await userModel.find().select('-hash');
}

export async function logIn(userParam: User) {
   return await repository.signIn(userParam)
}