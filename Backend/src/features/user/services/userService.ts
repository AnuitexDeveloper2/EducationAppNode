import * as repository from '../repositories/userRepositiry'
import userModel from '../../../dataAccess/entityModels/user';
import { UserFilterModel } from '../../shared/filterModels/userFilterModel';
import { validateWithJsonSchema } from '../../utils/validateWithJsonSchema';
import changePasswordValidateSchema from "../validateSchemas/ChangePassword.scema.json";
import idValidateSchema from '../../utils/IdRequest.schema.json'
import userValidateSchema from "../validateSchemas/UserRequest.schema.json";
import logger from '../../utils/logger';
import { ResetPassword } from '../api';


export async function getById(id: any): Promise<any> {
    const validateResult = validateWithJsonSchema(id, idValidateSchema);
    logger.info(`>>>> userService.getById(), with user id = ${JSON.stringify(id)}`);
    if (!validateResult.valid) {
        logger.error(`>>>> userService.getById(), invalid data = ${JSON.stringify(id)}`);
        return { message: `invalid id`, error: validateResult.errors };
    }

    const result = await repository.findById(id);

    if (result) {
        logger.error(`>>>> userService.getById(), result = ${result}`);
    }

    if (!result) {
        return "User not found";
    }

    return result;
}

export async function getAll() {
    return await userModel.find().select('-hash');
}


export async function edit(userParam: userModel): Promise<any> {
    const validateResult = validateWithJsonSchema(userParam, userValidateSchema);
    logger.info(`>>>> userService.edit(), with: user = ${JSON.stringify(userParam)}`)

    if (!validateResult.valid) {
        logger.error(`>>>> userService.edit(), invalid data = ${validateResult.errors}`)
        return { message: "Invalid UserEdit request", error: validateResult.errors };
    }

    const result = await repository.edit(userParam);

    if (result) {
        logger.error(`>>>> userService.edit(), result = ${result}`);
        return result;
    }

    return true;
}

export async function remove(id: string) {
    const validateResult = validateWithJsonSchema(id, idValidateSchema);
    logger.info(`>>>> userService.remove(), with: user id = ${JSON.stringify(id)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> userService.remove(), invalid data = ${JSON.stringify(id)}`);
        return { message: "Invalid id parameter", error: validateResult.errors };
    }
    const remove = { removed_at: true }
    const result = await repository.updateOne(id, remove);
    if (!result) {
        return false;
    }

    return result;
}

export async function blockUser(id: string) {
    const validateResult = validateWithJsonSchema(id, idValidateSchema);
    logger.info(`>>>> userService.blockUser(), with: user id = ${JSON.stringify(id)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> userService.blockUser(), invalid data = ${JSON.stringify(id)}`);
        return { message: "Invalid id parameter", error: validateResult.errors };
    }

    const result = await repository.blockUser(id);

    if (!result) {
        return "user not found";
    }

    return result;
}

export async function changePassword(changePasswordParam: ResetPassword) {
    const validateResult = validateWithJsonSchema(changePasswordParam, changePasswordValidateSchema);
    logger.info(`>>>> userService.changePassword(), with user changePasswordParam = ${JSON.stringify(changePasswordParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> userService.changePassword(), invalid data = ${JSON.stringify(changePasswordParam)}`);
        return { message: "invalid changePassword parameters", error: validateResult.errors };
    }

    const result = await repository.changePassword(changePasswordParam);

    if (!result) {
        logger.error(`>>>> userService.changePassword(), result = invalid password`);
        return "invalid password";
    }

    return result;

}

export async function getUser(filter: UserFilterModel) {
    const result = await repository.getUsers(filter);
    return result;
}
