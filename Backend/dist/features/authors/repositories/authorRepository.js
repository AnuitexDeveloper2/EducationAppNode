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
const author_1 = __importDefault(require("../../../dataAccess/entityModels/author"));
function createAsync(authorParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield author_1.default.create(authorParam);
        if (result == null) {
            return false;
        }
        console.log(result);
        return true;
    });
}
exports.createAsync = createAsync;
function removeAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new author_1.default();
        const author = author_1.default.findById(id);
        if (author == null) {
            return false;
        }
        model = yield author;
        model.removed_at = true;
        const result = yield author_1.default.update(author, model);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.removeAsync = removeAsync;
function updateAsync(authorParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = author_1.default.findById(authorParam._id);
        const result = yield author_1.default.update(author, authorParam);
        console.log(result);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.updateAsync = updateAsync;
function addProductAsync(authorId, printingEditionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = author_1.default.findById(authorId);
        let model = yield author;
        model.product_ids.push(printingEditionId);
        let result = yield author_1.default.update(author, model);
    });
}
exports.addProductAsync = addProductAsync;
function removeProductAsync(authorId, printingEditionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const author = author_1.default.findById(authorId);
        let model = yield author;
        console.log(authorId);
        console.log(printingEditionId);
        for (let index = 0; index < model.product_ids.length; index++) {
            if (model.product_ids[index].toString() == printingEditionId.toString()) {
                model.product_ids.splice(index, 1);
                yield author_1.default.update(author, model);
            }
        }
    });
}
exports.removeProductAsync = removeProductAsync;
function GetAsync() {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield author_1.default.find();
        return result;
    });
}
exports.GetAsync = GetAsync;
function GetAuthorsAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        let count;
        let query;
        let tableSort = { 'name': filter.sortType };
        let data = new Array();
        if (filter.searchString != null) {
            query = author_1.default.find({ $and: [{ name: { $regex: new RegExp(filter.searchString, 'i') } }, { removed_at: false }] });
        }
        if (filter.sortType == 0) {
            tableSort = { '_id': filter.sortType };
        }
        const options = {
            sort: tableSort,
            lean: true,
            page: filter.pageNumber,
            limit: filter.pageSize,
            populate: ({ path: "product_ids", select: "title" })
        };
        yield author_1.default.paginate(query, options).then(function (result) {
            count = result.total;
            data = result.docs;
        }).catch();
        const response = { data: data, count: count };
        return response;
    });
}
exports.GetAuthorsAsync = GetAuthorsAsync;
//# sourceMappingURL=authorRepository.js.map