"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorHandler_1 = require("./handlers/authorHandler");
const accessController_1 = require("../shared/accessControle/accessController");
const role_1 = require("../shared/enums/role");
exports.authorRouter = express_1.default();
exports.authorRouter.use(accessController_1.checkPermission(role_1.Role.Admin));
exports.authorRouter.post('/create', authorHandler_1.createAsync);
exports.authorRouter.post('/delete', authorHandler_1.removeAsync);
exports.authorRouter.post('/update', authorHandler_1.updateAsync);
exports.authorRouter.post('/', authorHandler_1.getAuthorsAsync);
exports.authorRouter.post('/get', authorHandler_1.getAsync);
//# sourceMappingURL=index.js.map