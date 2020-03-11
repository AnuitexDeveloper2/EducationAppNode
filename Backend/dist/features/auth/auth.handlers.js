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
function registerAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.registerAsync(req.body)
            .then((err) => res.json({ err }))
            .catch(err => next(err));
    });
}
exports.registerAsync = registerAsync;
function authenticateAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.logInAsync(req.body.LoginRequest.email, req.body.LoginRequest.password)
            .then(user => res.send(jwtHelper.generateTokens(user, res)))
            .catch();
    });
}
exports.authenticateAsync = authenticateAsync;
function confirmEmailAsync(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.confirmEmailAsync(req.body)
            .then((err) => res.json({ err }))
            .catch();
    });
}
exports.confirmEmailAsync = confirmEmailAsync;
function refreshTokens(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        jwtHelper.refreshTokens(res, req);
    });
}
exports.refreshTokens = refreshTokens;
/*export async function oAuht(req: Request, res: Response) {
  authService.oAuth(req.body.name).then((err) => res.redirect(err)).catch()
}
*/
function oAuhtCallback(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        yield authService.oAuthCallBack(req.body.code)
            .then((err) => res.json({ err }))
            .catch();
    });
}
exports.oAuhtCallback = oAuhtCallback;
/*redux dev tools, диспатч*/ 
//# sourceMappingURL=auth.handlers.js.map