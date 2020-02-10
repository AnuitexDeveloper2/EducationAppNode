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
const user_1 = __importDefault(require("../../shared/db-models/user"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const error_1 = require("../../shared/constants/error");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_1 = require("../../shared/enums/role");
const config = require('../../../../config');
function getUserAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield user_1.default.findOne({ email: userParam.email });
        if (result == null) {
            throw error_1.Error.userNotFound;
        }
        return result;
    });
}
exports.getUserAsync = getUserAsync;
;
function registerAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let checkUser = yield user_1.default.findOne({ email: userParam.email });
        if (checkUser != null) {
            false;
        }
        let user = new user_1.default(userParam);
        var salt = bcryptjs_1.default.genSaltSync(10);
        user.passwordHash = bcryptjs_1.default.hashSync(userParam.passwordHash, salt);
        let result = yield user_1.default.create(user);
        if (result == null) {
            return false;
        }
        return true;
    });
}
exports.registerAsync = registerAsync;
function signInAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let res = yield user_1.default.findById(userParam._id);
        let user = yield user_1.default.findOne({ email: userParam.email });
        if (user == null) {
            return false;
        }
        const result = yield checkPasswordAsync(userParam.passwordHash, user);
        if (!result) {
            return false;
        }
        const token = jsonwebtoken_1.default.sign({ sub: user.id, role: role_1.Role[user.role] }, config.secret, { expiresIn: '1h' });
        return true;
    });
}
exports.signInAsync = signInAsync;
function checkPasswordAsync(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bcryptjs_1.default.compareSync(password, user.passwordHash)) {
            return false;
        }
        return true;
    });
}
function editAsync(userParam, user) {
    return __awaiter(this, void 0, void 0, function* () {
        Object.assign(user, userParam);
        let result = yield user.save();
        if (result == null) {
            false;
        }
        return true;
        ;
    });
}
exports.editAsync = editAsync;
function removeOneAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.default.findById(userParam);
        if (user == null) {
            throw error_1.Error.userNotFound;
        }
        let result = yield user_1.default.findByIdAndRemove(userParam._id);
        console.log(result);
    });
}
exports.removeOneAsync = removeOneAsync;
function findByEmail(email) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.default.findOne({ email: email });
        if (user == null) {
            return false;
        }
        return true;
    });
}
exports.findByEmail = findByEmail;
function findById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.findById(id);
    });
}
exports.findById = findById;
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
//# sourceMappingURL=userRepositiry.js.map