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
const repository = __importStar(require("../auth/auth.repository"));
const validateWithJsonSchema_1 = require("../utils/validateWithJsonSchema");
const RegisterRequest_schema_json_1 = __importDefault(require("./operations/RegisterRequest.schema.json"));
const LogInRequest_schema_json_1 = __importDefault(require("./operations/LogInRequest.schema.json"));
const logger_1 = __importDefault(require("../utils/logger"));
const emailHelper_1 = require("./emailHelper/emailHelper");
const userRepositiry_1 = require("../user/repositories/userRepositiry");
const oAuthHelper_1 = require("../auth/oAuthHelper/oAuthHelper");
function registerAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(userParam, RegisterRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authService.register(), with: user = ${JSON.stringify(userParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authService.register(), invalid data = ${validateResult.errors}`);
            return { message: "Register parameter did not valid", error: validateResult.errors };
        }
        const result = yield repository.registerAsync(userParam);
        if (!result) {
            logger_1.default.error(`>>>> authService.register(), result = ${result}`);
        }
        return result;
    });
}
exports.registerAsync = registerAsync;
function logInAsync(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(email);
        const validateModel = { email: email, password: password };
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(validateModel, LogInRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authService.logIn(), with: model = ${JSON.stringify(validateModel)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authService.logIn(), invalid data = ${validateResult.errors}`);
            return { message: "LogIn parameters did not valid", error: validateResult.errors };
        }
        const result = yield repository.signInAsync(email, password);
        const test = typeof (result);
        if (test == "string") {
            logger_1.default.error(`>>>> authService.logIn(), result = ${result}`);
            return null;
        }
        return result;
    });
}
exports.logInAsync = logInAsync;
function confirmEmailAsync(email) {
    return __awaiter(this, void 0, void 0, function* () {
        const isEmailExist = yield userRepositiry_1.findByEmail(email);
        if (!isEmailExist) {
            logger_1.default.error(`>>>> authService.confirmEmail(), error  ${JSON.stringify(email)} has not been assigned to any user `);
            return "User Not Found";
        }
        const result = emailHelper_1.sendingEmail(isEmailExist);
        const error = typeof (result);
        if (error == "string") {
            logger_1.default.error(`>>>> autService.confirmEmail(), error = ${JSON.stringify(result)}`);
            return result;
        }
        return "email has been verified";
    });
}
exports.confirmEmailAsync = confirmEmailAsync;
/*
export async function oAuth(name: string) {
    const token = OauthOptions.createToken('access token', 'optional refresh token', 'optional token type', { data: name });
    const test1 = await OauthOptions.code.getUri()
    OauthOptions.code.getToken()
    console.log(test1)
    return test1;
}
 */
//https://www.facebook.com/connect/login_success.html
function oAuthCallBack(code) {
    return __awaiter(this, void 0, void 0, function* () {
        const uri = yield oAuthHelper_1.OauthOptions.code.getUri();
        const response = uri + JSON.stringify(code);
        return response;
    });
}
exports.oAuthCallBack = oAuthCallBack;
//# sourceMappingURL=auth.service.js.map