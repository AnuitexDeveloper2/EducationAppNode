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
const user_1 = __importDefault(require("../../../dataAccess/entityModels/user"));
const validateWithJsonSchema_1 = require("../../utils/validateWithJsonSchema");
const ChangePassword_scema_json_1 = __importDefault(require("../operations/ChangePassword.scema.json"));
const IdRequest_schema_json_1 = __importDefault(require("../../utils/IdRequest.schema.json"));
const UserRequest_schema_json_1 = __importDefault(require("../operations/UserRequest.schema.json"));
const logger_1 = __importDefault(require("../../utils/logger"));
function getByIdAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> userService.getById(), with user id = ${JSON.stringify(id)}`);
        console.log(id);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> userService.getById(), invalid data = ${JSON.stringify(id)}`);
            return { message: `invalid id`, error: validateResult.errors };
        }
        const result = yield repository.findByIdAsync(id);
        if (typeof (result) == "string") {
            logger_1.default.error(`>>>> userService.getById(), result = ${result}`);
        }
        if (!result) {
            return "User not found";
        }
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
function editAsync(userParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(userParam, UserRequest_schema_json_1.default);
        logger_1.default.info(`>>>> userService.edit(), with: user = ${JSON.stringify(userParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> userService.edit(), invalid data = ${validateResult.errors}`);
            return { message: "Invalid UserEdit request", error: validateResult.errors };
        }
        const result = yield repository.editAsync(userParam);
        if (result) {
            logger_1.default.error(`>>>> userService.edit(), result = ${result}`);
            return result;
        }
        return 'Ok';
    });
}
exports.editAsync = editAsync;
function removeAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> userService.remove(), with: user id = ${JSON.stringify(id)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> userService.remove(), invalid data = ${JSON.stringify(id)}`);
            return { message: "Invalid id parameter", error: validateResult.errors };
        }
        const result = yield repository.removeOneAsync(id);
        if (!result) {
            return "user not found";
        }
        return "user has been deleted";
    });
}
exports.removeAsync = removeAsync;
function changePassword(changePasswordParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(changePasswordParam, ChangePassword_scema_json_1.default);
        logger_1.default.info(`>>>> userService.changePassword(), with user changePasswordParam = ${JSON.stringify(changePasswordParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> userService.changePassword(), invalid data = ${JSON.stringify(changePasswordParam)}`);
            return { message: "invalid changePassword parameters", error: validateResult.errors };
        }
        const result = yield repository.changePasswordAsync(changePasswordParam);
        if (!result) {
            logger_1.default.error(`>>>> userService.changePassword(), result = invalid password`);
            return "invalid password";
        }
        return "Ok";
    });
}
exports.changePassword = changePassword;
function getUserAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = repository.getUsersAsync(filter);
        return result;
    });
}
exports.getUserAsync = getUserAsync;
//# sourceMappingURL=userService.js.map