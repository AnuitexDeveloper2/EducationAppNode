"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const printing_edition_handler_admin_1 = require("./handlers/printing-edition.handler.admin");
const printing_edition_handler_user_1 = require("./handlers/printing-edition.handler.user");
exports.adminProductRouter = express_1.Router();
//adminProductRouter.use(checkPermission(Role.Admin));
exports.adminProductRouter.post('/create', printing_edition_handler_admin_1.createAsync);
exports.adminProductRouter.delete('/:id', printing_edition_handler_admin_1.removeAsync);
exports.adminProductRouter.post('/update', printing_edition_handler_admin_1.updateAsync);
exports.adminProductRouter.get('/', printing_edition_handler_admin_1.getPrintingEditionsForAdminHandlerAsync);
exports.userProductRouter = express_1.Router();
//userProductRouter.use( checkPermission(Role.User));
exports.userProductRouter.get('/', printing_edition_handler_user_1.getPrintingEditionsForUserHandlerAsync);
exports.userProductRouter.get('/:id', printing_edition_handler_user_1.getPrintingEditionById);
//# sourceMappingURL=index.js.map