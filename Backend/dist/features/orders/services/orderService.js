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
const validateWithJsonSchema_1 = require("../../utils/validateWithJsonSchema");
const OrderRequest_schema_json_1 = __importDefault(require("../operations/OrderRequest.schema.json"));
const logger_1 = __importDefault(require("../../utils/logger"));
const orderRepository = __importStar(require("../repository/orderRepository"));
const IdRequest_schema_json_1 = __importDefault(require("../../utils/IdRequest.schema.json"));
function createOrderAsync(orderParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(orderParam, OrderRequest_schema_json_1.default);
        logger_1.default.info(`>>>> orderService.createOrder(), with: orderParam = ${orderParam}`);
        if (!validateResult.valid) {
            logger_1.default.error(`>>>> orderService.createOrder(), invalid data = ${validateResult.errors}`);
            return { message: "Order parameters did not valid", error: validateResult.errors };
        }
        const result = yield orderRepository.createOrderAsync(orderParam);
        if (!result) {
            logger_1.default.error(`>>>> orderService.createOrder(), result = ${result}`);
            return "order did not create";
        }
        return "Ok";
    });
}
exports.createOrderAsync = createOrderAsync;
function getOrdersForUserAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const validateResult = validateWithJsonSchema_1.validateWithJsonSchema(id, IdRequest_schema_json_1.default);
        logger_1.default.info(`>>>> orderService.getOrdersForUser(), with: id = ${id}`);
        if (!validateResult) {
            logger_1.default.error(`>>>> orderService.getOrderForUser(), invalid data = ${validateResult.errors}`);
            return { message: "Invalid userId", error: validateResult.errors };
        }
        const result = orderRepository.getOrdersForUserAsync(id);
        if (result == null) {
            logger_1.default.error(`>>>> orderService.getOrderForUser(), result = user did not have any orders `);
        }
        return result;
    });
}
exports.getOrdersForUserAsync = getOrdersForUserAsync;
function getOrdersForAdminAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        logger_1.default.info(`>>> orderService.getOrdersForAdmin(), with filter = ${filter}`);
        const result = orderRepository.getOrdersForAdminAsync(filter);
        return result;
    });
}
exports.getOrdersForAdminAsync = getOrdersForAdminAsync;
//# sourceMappingURL=orderService.js.map