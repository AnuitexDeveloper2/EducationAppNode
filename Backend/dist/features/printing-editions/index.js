"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const printing_edition_handler_admin_1 = require("./handlers/printing-edition.handler.admin");
const printing_edition_handler_user_1 = require("./handlers/printing-edition.handler.user");
const accessController_1 = require("../shared/accessControle/accessController");
const role_1 = require("../shared/enums/role");
exports.adminProductRouter = express_1.Router();
exports.adminProductRouter.use(accessController_1.checkPermission(role_1.Role.Admin));
exports.adminProductRouter.post('/create', printing_edition_handler_admin_1.createAsync);
exports.adminProductRouter.post('/remove', printing_edition_handler_admin_1.removeAsync);
exports.adminProductRouter.post('/update', printing_edition_handler_admin_1.updateAsync);
exports.adminProductRouter.post('/', printing_edition_handler_admin_1.getPrintingEditionsForAdminHandlerAsync);
exports.userProductRouter = express_1.Router();
//userProductRouter.use( checkPermission(Role.User));
exports.userProductRouter.post('/', printing_edition_handler_user_1.getPrintingEditionsForUserHandlerAsync);
exports.userProductRouter.get('/:id', printing_edition_handler_user_1.getPrintingEditionById);
//# sourceMappingURL=index.js.map