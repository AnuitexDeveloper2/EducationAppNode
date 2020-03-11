"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../dataAccess/entityModels/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const error_1 = require("../../shared/constants/error");
function getUserAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield user_1.default.findOne({ email: userParam.email });
        if (result == null) {
            throw error_1.Error.userNotFound;
        }
        return result;
    });
}
exports.getUserAsync = getUserAsync;
;
function checkPasswordAsync(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bcrypt_1.default.compareSync(password, user.passwordHash)) {
            return false;
        }
        return true;
    });
}
exports.checkPasswordAsync = checkPasswordAsync;
function editAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findById(userParam.id);
        let result;
        try {
            result = yield user_1.default.updateOne(user, userParam);
        }
        catch (error) {
            return error;
        }
        if (result.nModified == 0) {
            return 'failed to update user';
        }
        return;
    });
}
exports.editAsync = editAsync;
function removeOneAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new user_1.default();
        const user = user_1.default.findById(id);
        model = yield user;
        model.removed_at = true;
        const result = yield user_1.default.update(user, model);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.removeOneAsync = removeOneAsync;
function changePasswordAsync(param) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new user_1.default();
        const user = user_1.default.findById(param._id);
        const isPasswordMatch = yield checkPasswordAsync(param.oldPassword, yield user);
        if (!isPasswordMatch) {
            return false;
        }
        model = yield user;
        const salt = bcrypt_1.default.genSaltSync(10);
        model.passwordHash = bcrypt_1.default.hashSync(param.newPassword, salt);
        const result = yield user_1.default.update(user, model);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.changePasswordAsync = changePasswordAsync;
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.default.findOne(email);
        if (user == null) {
            return false;
        }
        return user.email;
    });
}
exports.findByEmail = findByEmail;
function findByIdAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = new user_1.default();
        try {
            user = yield user_1.default.findById(id);
        }
        catch (error) {
            return error.message;
        }
        return user;
    });
}
exports.findByIdAsync = findByIdAsync;
function findByUserName(userName) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield user_1.default.findOne({ userName: userName });
        if (result == null) {
            return false;
        }
        return true;
    });
}
exports.findByUserName = findByUserName;
function getUsersAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        let count;
        let query;
        let tableSort = { 'firstName': filter.sortType };
        let data = new Array();
        if (filter.searchString != null) {
            query = user_1.default.find({ $or: [{ lastName: { $regex: new RegExp(filter.searchString, 'i') } }, { firstName: { $regex: new RegExp(filter.searchString, 'i') } }] });
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
        yield user_1.default.paginate(query, options).then(function (result) {
            count = result.total;
            data = result.docs;
        }).catch();
        const response = { data: data, count: count };
        return response;
    });
}
exports.getUsersAsync = getUsersAsync;
//# sourceMappingURL=userRepositiry.js.map