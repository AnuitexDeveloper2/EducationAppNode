import userModel from "../../../dataAccess/entityModels/user";
import { User, ResetPassword } from "../api";
import bcrypt from "bcrypt";
import { UserFilterModel } from "../../shared/filterModels/userFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";
import { UserFilterType } from "../../shared/enums/userFilterType";
import { checkPassword } from "../../auth/auth.service";

export async function edit(userParam: userModel): Promise<userModel> {
    const user = await userModel.findById(userParam.id);
    if (user === null) {
        return null
    }
    const result = await userModel.updateOne(user, userParam);

    if (result.nModified == 0) {
        return null;
    }

    const updatedUser = await userModel.findById(userParam.id)

    return updatedUser;
}

export async function updateOne(id: string, prop: any): Promise<any> {
    const result = await userModel.findByIdAndUpdate(id, prop);
    if (result === null) {
        return false;
    }

    return result;
}

export async function blockUser(id: string): Promise<Boolean> {
    let model = new userModel();
    const user = userModel.findById(id);
    model = await user;
    model.status = !(await user).status;
    const result = await userModel.update(user, model);

    if (result.nModified == 0) {
        return false;
    }

    return true;
}

export async function changePassword(param: ResetPassword): Promise<boolean> {
    let model = new userModel();
    const user = userModel.findById(param.id);
    const isPasswordMatch = checkPassword(param.oldPassword, await user);

    if (!isPasswordMatch) {
        return false;
    }
    model = await user;
    const salt = bcrypt.genSaltSync(10);
    model.passwordHash = bcrypt.hashSync(param.newPassword, salt);
    const result = await userModel.update(user, model);

    if (result.nModified == 0) {
        return false;
    }

    return true;
}

export async function findById(id: string): Promise<userModel> {
    let user = new userModel();

    user = await userModel.findById(id);

    return user;
}


export async function getUsers(filter: UserFilterModel) {
    let count;
    let query;
    let tableSort: any = { 'firstName': filter.sortType };
    let data = new Array<userModel>();

    if (filter.searchString != null) {
        query = userModel
            .find({ $and: [{ $or: [{ lastName: { $regex: new RegExp(filter.searchString, 'i') } }, { firstName: { $regex: new RegExp(filter.searchString, 'i') } }] }, { removed_at: false }] });
    }
    if (filter.userType !== UserFilterType.All) {
        query = filter.userType === UserFilterType.Active ? query.find({ status: false }) : query.find({ status: true })

    }
    if (filter.sortType == 0) {
        tableSort = { '_id': filter.sortType };
    }
    const options = {
        sort: tableSort,
        lean: true,
        page: filter.pageNumber,
        limit: filter.pageSize
    };

    await userModel.paginate(query, options).then(function (result) {
        count = result.total
        data = result.docs
    }).catch();
    const response: BaseResponse<userModel> = { data: data, count: count }
    return response;
}

