"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const auth_handlers_1 = require("../auth/auth.handlers");
exports.authRouter = express_1.Router();
exports.authRouter.post('/logIn', auth_handlers_1.authenticateAsync);
exports.authRouter.post('/register', auth_handlers_1.registerAsync);
exports.authRouter.post('/refreshTokens', auth_handlers_1.refreshTokens);
exports.authRouter.post('/oAuth', auth_handlers_1.oAuht);
exports.authRouter.post('/confirmedEmail', auth_handlers_1.confirmEmailAsync);
//# sourceMappingURL=index.js.map