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
const repository = __importStar(require("../repositories/printingEditionRepository"));
const PrintingEditionRequest_schema_json_1 = __importDefault(require("../operations/PrintingEditionRequest.schema.json"));
const validateWithJsonSchema_1 = require("../../utils/validateWithJsonSchema");
const IdRequest_schema_json_1 = __importDefault(require("../../utils/IdRequest.schema.json"));
const logger_1 = __importDefault(require("../../utils/logger"));
function createAsync(printingEditionParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(PrintingEditionRequest_schema_json_1.default, validateWithJsonSchema_1.validateWithJsonSchema);
        logger_1.default.info(`>>>> printingEditionService.create(), with: printingEditionParam = ${JSON.stringify(printingEditionParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> printingEditionService.create(), invalid data = ${validateResult.errors}`);
            return { message: "printingEdition parameters is not valide", error: validateResult.errors };
        }
        const result = yield repository.createAsync(printingEditionParam);
        if (!result) {
            logger_1.default.error(`>>>> printingEditionService.create(), result = ${result}`);
            return ("failed to save document");
        }
        return result;
    });
}
exports.createAsync = createAsync;
function removeAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> printingEditionService.remove(), with: printingEdition id = ${JSON.stringify(id)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> printingEditionService.remove(), invalid data = ${validateResult.errors}`);
            return { message: "id parameters is not valide", error: validateResult.errors };
        }
        const result = yield repository.removeAsync(id);
        if (!result) {
            logger_1.default.error(`>>>> printingEditionService.remove(), result = ${result}`);
            return result;
        }
        return result;
    });
}
exports.removeAsync = removeAsync;
function updateAsync(printingEditionParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(printingEditionParam, PrintingEditionRequest_schema_json_1.default);
        logger_1.default.info(`>>>> printingEditionService.update(), with: printingEdition = ${JSON.stringify(printingEditionParam)}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> printingEditionService.update(), invalid data = ${validateResult.errors}`);
            return { message: "printingEdition parameters is not valide", error: validateResult.errors };
        }
        const result = yield repository.updateAsync(printingEditionParam);
        if (!result) {
            logger_1.default.error(`>>>> printingEditionService.update(), result = ${result}`);
            return "product did not update";
        }
        return result;
    });
}
exports.updateAsync = updateAsync;
function getPrintingEditionsAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = repository.getPrintingEditionsAsync(filter);
        return result;
    });
}
exports.getPrintingEditionsAsync = getPrintingEditionsAsync;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> printingEditionService.getById(), with: printingEdition id = ${id}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> printingEditionService.getById(), invalid data = ${validateResult.errors}`);
            return { message: "id parameters is not valide", error: validateResult.errors };
        }
        const result = repository.getById(id);
        if (!result) {
            logger_1.default.error(`>>>> printingEditionService.getById(), result = ${result}`);
            return { message: "printingEdition did not find", error: validateResult.errors };
        }
        return result;
    });
}
exports.getById = getById;
//# sourceMappingURL=printingEditionService.js.map