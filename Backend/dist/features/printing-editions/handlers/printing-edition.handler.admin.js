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
Object.defineProperty(exports, "__esModule", { value: true });
const printingEditionService = __importStar(require("../services/printingEditionService"));
function createAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        printingEditionService.createAsync(req.body)
            .then(users => res.json(users))
            .catch(err => next(err));
    });
}
exports.createAsync = createAsync;
function removeAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        printingEditionService.removeAsync(req.body)
            .then(users => res.json(users))
            .catch(err => next(err));
    });
}
exports.removeAsync = removeAsync;
function updateAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        printingEditionService.updateAsync(req.body.printingEdition, req.body._id)
            .then(users => res.json(users))
            .catch(err => next(err));
    });
}
exports.updateAsync = updateAsync;
function getPrintingEditionsForAdminHandlerAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        printingEditionService.getPrintingEditionsAsync(req.body)
            .then(users => res.json(users))
            .catch(err => next(err));
    });
}
exports.getPrintingEditionsForAdminHandlerAsync = getPrintingEditionsForAdminHandlerAsync;
//# sourceMappingURL=printing-edition.handler.admin.js.map