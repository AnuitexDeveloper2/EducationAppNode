import * as repository from '../repositories/userRepositiry'
import {User} from "../api";
import userModel from '../../shared/db-models/user';
import { Error } from '../../shared/constants/error';
import { Properties } from '../../shared/constants/properties';
import { UserFilterModel } from '../../shared/filterModels/userFilterModel';



export async function getByIdAsync(userParam: User): Promise<User> {
   
    let result = await repository.getUserAsync(userParam)

    return result;
}

export async function getAllAsync() {
    return await userModel.find().select('-hash');
}



export async function editAsync(userParam: User) : Promise<Array<string>> {
    let model = new userModel();
    model.error = new Array<string>();
    let user = await repository.findById(userParam.Id);
    if (user == null) {
        model.error.push(Error.userNotFound);
        return model.error;
    }

    if (user.email !== userParam.email && await userModel.findOne({ email: userParam.email })) {
        model.error.push(Error.Email + userParam.email + Error.IsAlreadyTaken);
        return model.error;
    }

    if (user.userName !== userParam.userName && await userModel.findOne({ userName: userParam.userName })) {
        model.error.push(Error.UserName + userParam.userName + Error.IsAlreadyTaken);
        return model.error; 
    }

     let result = await repository.editAsync(userParam,user);
     if (!result) {
         model.error.push(Error.NotUserEdit);
     }
    return model.error;
}

export async function removeAsync(userParam: userModel) {

    return await repository.removeOneAsync(userParam);
}

export async function getUserAsync(filter:UserFilterModel) {
    const result = repository.getUsersAsync(filter);
    return result;
}
