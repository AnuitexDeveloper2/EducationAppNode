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
const user_1 = __importDefault(require("../../dataAccess/entityModels/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userLogins_1 = __importDefault(require("../../dataAccess/entityModels/userLogins"));
const emailHelper_1 = require("./emailHelper/emailHelper");
function registerAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkUser = yield user_1.default.findOne({ email: userParam.email });
        if (checkUser != null) {
            false;
        }
        let user = new user_1.default(userParam);
        const salt = bcrypt_1.default.genSaltSync(10);
        user.passwordHash = bcrypt_1.default.hashSync(userParam.passwordHash, salt);
        let result = yield user_1.default.create(user);
        if (result === null) {
            return false;
        }
        const isSent = emailHelper_1.sendingEmail(result);
        return true;
    });
}
exports.registerAsync = registerAsync;
function signInAsync(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        let user = yield user_1.default.findOne({ email: email });
        if (user == null) {
            return "user is not found";
        }
        return user;
    });
}
exports.signInAsync = signInAsync;
function signInOAuthAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const user = yield user_1.default.findOne({ email: userParam.email });
        if (user !== null) {
            return user;
        }
        const client = yield user_1.default.create(userParam);
        const clientParam = { user_Id: client._id };
        const oauthClient = yield userLogins_1.default.create(clientParam);
        return client;
    });
}
exports.signInOAuthAsync = signInOAuthAsync;
//# sourceMappingURL=auth.repository.js.map