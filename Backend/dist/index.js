"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const Initial_1 = require("../src/features/shared/repositories/Initial");
const body_parser_1 = __importDefault(require("body-parser"));
const userHandler_1 = require("../src/features/user/handlers/userHandler");
const app = express_1.default();
const init = Initial_1.Init.prototype;
init.Check();
app.use(body_parser_1.default.urlencoded({ extended: false }));
app.use(body_parser_1.default.json());
app.use('/user', userHandler_1.userRouter);
app.use('/admin', userHandler_1.adminRouter);
mongoose_1.default.connect("mongodb://localhost/educationdb", { useCreateIndex: true, useNewUrlParser: true });
app.listen(8000, () => console.log('server running'));
//# sourceMappingURL=index.js.map