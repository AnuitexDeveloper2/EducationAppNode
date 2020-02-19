import * as repository from '../repositories/userRepositiry'
import {User} from "../api";
import userModel from '../../../dataAccess/entityModels/user';
import { Error } from '../../shared/constants/error';
import { UserFilterModel } from '../../shared/filterModels/userFilterModel';
import { validateWithJsonSchema } from '../../utils/validateWithJsonSchema';
import userValidateSchema from "../operations/UserRequest.schema.json";
import logger from '../../utils/logger';

export async function getByIdAsync(userParam: User): Promise<User> {
   
    let result = await repository.getUserAsync(userParam)

    return result;
}

export async function getAllAsync() {
    return await userModel.find().select('-hash');
}


export async function editAsync(userParam: userModel) : Promise<any> {
   const validateResult = validateWithJsonSchema(userParam, userValidateSchema);
   logger.info(`>>>> userService.edit(), with: user = ${userParam}`)
    console.log(userParam);
   if (!validateResult.valid) {
    logger.error(`>>>> userService.edit(), invalid data = ${validateResult.errors}`)
    return {message: "Invalid UserEdit request", error: validateResult.errors}
    }

    const result = await repository.editAsync(userParam)
  
    if (result) {
        logger.error(`>>>> userService.edit(), result = ${result}`)
        return result;
    }
   
    return 'Ok';
}

export async function removeAsync(userParam: userModel) {

    return await repository.removeOneAsync(userParam);
}

export async function getUserAsync(filter:UserFilterModel) {
    const result = repository.getUsersAsync(filter);
    return result;
}
