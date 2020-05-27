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
const orders_1 = __importDefault(require("../../../dataAccess/entityModels/orders"));
function createOrderAsync(orderParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield orders_1.default.create(orderParam);
        if (result == null) {
            return false;
        }
        return true;
    });
}
exports.createOrderAsync = createOrderAsync;
function getOrdersForAdminAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        let query;
        let count;
        let data = new Array();
        query = orders_1.default.find().populate("user_id").populate("items.printing_edition_id");
        const options = {
            sort: "_id",
            lean: true,
            page: filter.pageNumber,
            limit: filter.pageSize,
        };
        yield orders_1.default.paginate(query, options).then(function (result) {
            count = result.total;
            data = result.docs;
        }).catch();
        const response = { data: data, count: count };
        return response;
    });
}
exports.getOrdersForAdminAsync = getOrdersForAdminAsync;
function getOrdersForUserAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield orders_1.default.find({ user_id: id }).populate("items.printing_edition_id");
        if (result.length == 0) {
            return null;
        }
        return result;
    });
}
exports.getOrdersForUserAsync = getOrdersForUserAsync;
//# sourceMappingURL=orderRepository.js.map