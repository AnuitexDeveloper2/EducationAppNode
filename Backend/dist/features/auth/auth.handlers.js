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
const authService = __importStar(require("../auth/auth.service"));
const jwtHelper = __importStar(require("./jwtHelper/jwtHelper"));
function registerAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.registerAsync(req.body.user)
            .then((err) => res.json({ err }))
            .catch();
    });
}
exports.registerAsync = registerAsync;
function authenticateAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.logInAsync(req.body.email, req.body.password)
            .then(user => res.send(user))
            .catch();
    });
}
exports.authenticateAsync = authenticateAsync;
function confirmEmailAsync(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.confirmedEmailAsync(req.body)
            .then((user) => res.send(user))
            .catch();
    });
}
exports.confirmEmailAsync = confirmEmailAsync;
function refreshTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jwtHelper.refreshTokens(res, req).then((err) => res.json(err));
    });
}
exports.refreshTokens = refreshTokens;
function oAuht(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.oAuth(req.body)
            .then(user => res.send(user))
            .catch();
    });
}
exports.oAuht = oAuht;
//# sourceMappingURL=auth.handlers.js.map