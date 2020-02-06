"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = express_1.default();
const add = (a, b) => a + b;
app.get('/', (req, res, next) => {
    console.log(add(10, 5));
    res.send('Server works');
});
app.listen(8000, () => console.log('server running'));
