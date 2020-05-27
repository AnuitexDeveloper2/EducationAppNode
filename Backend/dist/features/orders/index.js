"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const order_user_handler_1 = require("./handlers/order.user.handler");
const order_admin_handler_1 = require("./handlers/order.admin.handler");
const role_1 = require("../shared/enums/role");
const accessController_1 = require("../shared/accessControle/accessController");
exports.orderUserRouter = express_1.Router();
// orderUserRouter.use(checkPermission(Role.User))
exports.orderUserRouter.post('/', order_user_handler_1.createOrderAsync);
exports.orderUserRouter.post('/myOrders', order_user_handler_1.getOrderForUserAsync);
exports.orderAdminRouter = express_1.Router();
exports.orderAdminRouter.use(accessController_1.checkPermission(role_1.Role.Admin));
exports.orderAdminRouter.post('/', order_admin_handler_1.getOrdersAsync);
//# sourceMappingURL=index.js.map