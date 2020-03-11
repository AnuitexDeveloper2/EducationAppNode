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
const author_1 = __importDefault(require("../../../dataAccess/entityModels/author"));
const authorRepository = __importStar(require("../repositories/authorRepository"));
const validateWithJsonSchema_1 = require("../../utils/validateWithJsonSchema");
const AuthorRequest_schema_json_1 = __importDefault(require("../operations/AuthorRequest.schema.json"));
const IdRequest_schema_json_1 = __importDefault(require("../../utils/IdRequest.schema.json"));
const logger_1 = __importDefault(require("../../utils/logger"));
let author = new author_1.default();
function createAsync(authorParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(authorParam, AuthorRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authorService.create(), with: author = ${JSON.stringify(authorParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authorService.create(), invalid data = ${validateResult.errors}`);
            return { message: "Invalid AuthorCreate request", error: validateResult.errors };
        }
        const result = yield authorRepository.createAsync(authorParam);
        if (!result) {
            logger_1.default.error(`>>>> authorService.create(), result = ${result}`);
            return "aurhor did not create";
        }
        return "Ok";
    });
}
exports.createAsync = createAsync;
function removeAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authorService.create(), with: Id = ${JSON.stringify(id)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authorService.remove(), invalid data = ${validateResult.errors}`);
            return "id is not valid";
        }
        const result = yield authorRepository.removeAsync(id);
        if (!result) {
            logger_1.default.error(`>>>> authorService.create(), result = ${result}`);
            return "author did not remove";
        }
        return result;
    });
}
exports.removeAsync = removeAsync;
function updateAsync(authorParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(authorParam, AuthorRequest_schema_json_1.default);
        logger_1.default.info(`>>>> authorService.update(), with: author = ${JSON.stringify(authorParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> authorService.update(), invalid data = ${validateResult.errors}`);
            return { message: "Invalid Author Update request", error: validateResult.errors };
        }
        const result = yield authorRepository.updateAsync(authorParam);
        if (!result) {
            logger_1.default.error(`>>>> authorService.update(), result = ${result}`);
            return "aurhor did not update";
        }
        return result;
    });
}
exports.updateAsync = updateAsync;
function getAuthorsAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`>>>> authorService.getAuthors(), with: filter = ${JSON.stringify(filter)}`);
        const result = yield authorRepository.GetAuthorsAsync(filter);
        return result;
    });
}
exports.getAuthorsAsync = getAuthorsAsync;
//# sourceMappingURL=authorService.js.map