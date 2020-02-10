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
const express_1 = require("express");
const userService = __importStar(require(".././services/userService"));
exports.userRouter = express_1.Router();
exports.userRouter.post('/register', registerAsync);
exports.userRouter.get('/me', getUserAsync);
exports.userRouter.post('/logIn', authenticateAsync);
exports.userRouter.get('/edit', editAsync);
exports.adminRouter = express_1.Router();
exports.adminRouter.get('/getAll', getAllAsync);
exports.adminRouter.post('/remove', removeAsync);
function registerAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        let result = yield userService.registerAsync(req.body)
            .then((err) => res.json({ err }))
            .catch(err => next(err));
    });
}
exports.registerAsync = registerAsync;
function getUserAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield userService.getByIdAsync(req.body)
            .then((user) => res.json({ user }))
            .catch(err => next(err));
    });
}
exports.getUserAsync = getUserAsync;
function getAllAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        userService.getAllAsync()
            .then(users => res.json(users))
            .catch(err => next(err));
    });
}
exports.getAllAsync = getAllAsync;
function authenticateAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        userService.logInAsync(req.body)
            .then(token => res.json(token))
            .catch(err => next(err));
    });
}
exports.authenticateAsync = authenticateAsync;
function editAsync(req, res, next) {
    userService.editAsync(req.body)
        .then((err) => res.json({ err }))
        .catch(err => next(err));
}
exports.editAsync = editAsync;
function removeAsync(req, res, next) {
    userService.removeAsync(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}
exports.removeAsync = removeAsync;
//# sourceMappingURL=userHandler.js.map