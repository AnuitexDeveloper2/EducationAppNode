"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_handler_user_1 = require("./handlers/user.handler.user");
const user_handler_admin_1 = require("./handlers/user.handler.admin");
const accessController_1 = require("../shared/accessControle/accessController");
const role_1 = require("../shared/enums/role");
exports.userRouter = express_1.Router();
//userRouter.use(checkPermission(Role.User))
exports.userRouter.get('/me', user_handler_user_1.getProfileAsync);
exports.userRouter.post('/edit', user_handler_user_1.editAsync);
exports.userRouter.post('/editPassword', user_handler_user_1.changePassword);
exports.adminRouter = express_1.Router();
exports.adminRouter.use(accessController_1.checkPermission(role_1.Role.Admin));
exports.adminRouter.post('/getAll', user_handler_admin_1.getAllAsync);
exports.adminRouter.delete('/remove', user_handler_admin_1.removeAsync);
exports.adminRouter.get('/', user_handler_admin_1.getUsersAsync);
//# sourceMappingURL=index.js.map