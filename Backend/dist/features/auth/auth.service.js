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
const bcrypt_1 = __importDefault(require("bcrypt"));
const repository = __importStar(require("../auth/auth.repository"));
const validateWithJsonSchema_1 = require("../utils/validateWithJsonSchema");
const RegisterRequest_schema_json_1 = __importDefault(require("./operations/RegisterRequest.schema.json"));
const LogInRequest_schema_json_1 = __importDefault(require("./operations/LogInRequest.schema.json"));
const logger_1 = __importDefault(require("../utils/logger"));
const jwtHelper_1 = require("./jwtHelper/jwtHelper");
const IdRequest_schema_json_1 = __importDefault(require("../utils/IdRequest.schema.json"));
const userRepositiry_1 = require("../user/repositories/userRepositiry");
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
            return false;
        }
        return result;
    });
}
exports.registerAsync = registerAsync;
function logInAsync(email, password) {
    return __awaiter(this, void 0, void 0, function* () {
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
            return false;
        }
        const isPasswordValid = checkPasswordAsync(password, result);
        if (result) {
            return { error: "Password is not valid" };
        }
        return jwtHelper_1.generateTokens(result);
    });
}
exports.logInAsync = logInAsync;
function checkPasswordAsync(password, user) {
    return __awaiter(this, void 0, void 0, function* () {
        if (!bcrypt_1.default.compareSync(password, user.passwordHash)) {
            return false;
        }
        return true;
    });
}
exports.checkPasswordAsync = checkPasswordAsync;
function confirmedEmailAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        console.log(id);
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authService.confirmedEmail(), with: user id = ${JSON.stringify(id)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authService.confirmedEmail(), invalid data = ${JSON.stringify(id)}`);
            return { message: "Invalid id parameter", error: validateResult.errors };
        }
        const property = { confirmedEmai: true };
        const result = yield userRepositiry_1.updateOneAsync(id, property);
        if (!result) {
            return "user not found";
        }
        return result;
    });
}
exports.confirmedEmailAsync = confirmedEmailAsync;
function oAuth(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(userParam, RegisterRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authService.oAuth(), with: user = ${JSON.stringify(userParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authService.oAuth(), invalid data = ${validateResult.errors}`);
            return { message: "Register parameter did not valid", error: validateResult.errors };
        }
        const result = yield repository.signInOAuthAsync(userParam);
        if (result === null) {
            return false;
        }
        return jwtHelper_1.generateTokens(result);
    });
}
exports.oAuth = oAuth;
//# sourceMappingURL=auth.service.js.map