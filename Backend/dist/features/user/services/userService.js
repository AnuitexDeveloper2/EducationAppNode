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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const repository = __importStar(require("../repositories/userRepositiry"));
const user_1 = __importDefault(require("../../shared/db-models/user"));
const error_1 = require("../../shared/constants/error");
function registerAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new user_1.default();
        model.error = new Array();
        let wasExist = yield repository.findByEmail(userParam.email);
        if (wasExist) {
            model.error.push(error_1.Error.Email + userParam.email + error_1.Error.IsAlreadyTaken);
            return model.error;
        }
        wasExist = yield repository.findByUserName(userParam.userName);
        if (wasExist) {
            model.error.push(error_1.Error.UserName + userParam.email + error_1.Error.IsAlreadyTaken);
            return model.error;
        }
        const result = yield repository.registerAsync(userParam);
        return userParam.error;
    });
}
exports.registerAsync = registerAsync;
function getByIdAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield repository.getUserAsync(userParam);
        return result;
    });
}
exports.getByIdAsync = getByIdAsync;
function getAllAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        return yield user_1.default.find().select('-hash');
    });
}
exports.getAllAsync = getAllAsync;
function logInAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        if (userParam.email === null || userParam.passwordHash === null) {
            return null;
        }
        let result = yield repository.signInAsync(userParam);
        return yield result;
    });
}
exports.logInAsync = logInAsync;
function editAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new user_1.default();
        model.error = new Array();
        let user = yield repository.findById(userParam.Id);
        if (user == null) {
            model.error.push(error_1.Error.userNotFound);
            return model.error;
        }
        if (user.email !== userParam.email && (yield user_1.default.findOne({ email: userParam.email }))) {
            model.error.push(error_1.Error.Email + userParam.email + error_1.Error.IsAlreadyTaken);
            return model.error;
        }
        if (user.userName !== userParam.userName && (yield user_1.default.findOne({ userName: userParam.userName }))) {
            model.error.push(error_1.Error.UserName + userParam.userName + error_1.Error.IsAlreadyTaken);
            return model.error;
        }
        let result = yield repository.editAsync(userParam, user);
        if (!result) {
            model.error.push(error_1.Error.NotUserEdit);
        }
        return model.error;
    });
}
exports.editAsync = editAsync;
function removeAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        return yield repository.removeOneAsync(userParam);
    });
}
exports.removeAsync = removeAsync;
//# sourceMappingURL=userService.js.map