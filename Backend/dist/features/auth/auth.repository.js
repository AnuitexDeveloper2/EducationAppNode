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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../dataAccess/entityModels/user"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const userRepository = __importStar(require("../user/repositories/userRepositiry"));
function registerAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const checkUser = yield user_1.default.findOne({ email: userParam.email });
        if (checkUser != null) {
            false;
        }
        let user = new user_1.default(userParam);
        const salt = bcrypt_1.default.genSaltSync(10);
        user.passwordHash = bcrypt_1.default.hashSync(userParam.passwordHash, salt);
        try {
            let result = yield user_1.default.create(user);
        }
        catch (error) {
            return error.errmsg;
        }
        return true;
    });
}
exports.registerAsync = registerAsync;
function signInAsync(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email);
        let user = yield user_1.default.findOne({ email: email });
        if (user == null) {
            return "user is not found";
        }
        const isPasswordValid = yield userRepository.checkPasswordAsync(password, user);
        if (!isPasswordValid) {
            return "invalid password";
        }
        return user;
    });
}
exports.signInAsync = signInAsync;
//# sourceMappingURL=auth.repository.js.map