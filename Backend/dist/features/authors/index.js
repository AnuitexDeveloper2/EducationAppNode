"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authorHandler_1 = require("./handlers/authorHandler");
exports.authorRouter = express_1.default();
//authorRouter.use(checkPermission(Role.Admin))
exports.authorRouter.post('/create', authorHandler_1.createAsync);
exports.authorRouter.delete('/:id', authorHandler_1.removeAsync);
exports.authorRouter.post('/update', authorHandler_1.updateAsync);
exports.authorRouter.get('/', authorHandler_1.getAuthorsAsync);
//# sourceMappingURL=index.js.map