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
const printing_edition_1 = __importDefault(require("../../../dataAccess/entityModels/printing-edition"));
const authorRepository = __importStar(require("../../authors/repositories/authorRepository"));
function createAsync(printingEditionParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const result = yield printing_edition_1.default.create(printingEditionParam);
        if (result == null) {
            return false;
        }
        for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
            authorRepository.addProductAsync(printingEditionParam.author_ids[index], result.id);
        }
        return true;
    });
}
exports.createAsync = createAsync;
function removeAsync(id) {
    return __awaiter(this, void 0, void 0, function* () {
        let model = new printing_edition_1.default();
        const printingEdition = printing_edition_1.default.findById(id);
        if (printingEdition == null) {
            return false;
        }
        model = yield printingEdition;
        model.removed_at = true;
        const result = yield printing_edition_1.default.update(printingEdition, model);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.removeAsync = removeAsync;
function updateAsync(printingEditionParam) {
    return __awaiter(this, void 0, void 0, function* () {
        const printingEdition = printing_edition_1.default.findById(printingEditionParam._id);
        for (let index = 0; index < (yield printingEdition).author_ids.length; index++) {
            authorRepository.removeProductAsync((yield printingEdition).author_ids[index], (yield printingEdition)._id);
        }
        for (let index = 0; index < printingEditionParam.author_ids.length; index++) {
            authorRepository.addProductAsync(printingEditionParam.author_ids[index], (yield printingEdition)._id);
        }
        const result = yield printing_edition_1.default.update(printingEdition, printingEditionParam);
        if (result.nModified == 0) {
            return false;
        }
        return true;
    });
}
exports.updateAsync = updateAsync;
function getById(id) {
    return __awaiter(this, void 0, void 0, function* () {
        const printingEdition = yield printing_edition_1.default.findById(id).populate('author_ids').select(['title', 'name']);
        return printingEdition;
    });
}
exports.getById = getById;
function getPrintingEditionsAsync(filter) {
    return __awaiter(this, void 0, void 0, function* () {
        let data = new Array();
        let count;
        let query;
        let tableSort = { 'title': filter.sortType };
        if (filter.searchString != null) {
            query = printing_edition_1.default.find().find({ title: { $regex: new RegExp(filter.searchString, 'i') } });
        }
        if (filter.sortType == 0) {
            tableSort = { '_id': filter.sortType };
        }
        const options = {
            sort: tableSort,
            lean: true,
            populate: ({ path: ('author_ids'), select: (['name']) }),
            page: filter.pageNumber,
            limit: filter.pageSize,
        };
        yield printing_edition_1.default.paginate(query, options).then(function (result) {
            count = result.total;
            data = result.docs;
        }).catch();
        const response = { data: data, count: count };
        return response;
    });
}
exports.getPrintingEditionsAsync = getPrintingEditionsAsync;
//# sourceMappingURL=printingEditionRepository.js.map