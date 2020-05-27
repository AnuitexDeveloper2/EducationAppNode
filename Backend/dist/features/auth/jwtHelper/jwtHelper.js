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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../dataAccess/entityModels/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const logger_1 = __importDefault(require("../../utils/logger"));
let currentRole;
exports.generateTokens = (userModel) => {
    if (userModel == null) {
        return userModel;
    }
    const user = {
        "role": userModel.role,
        "id": userModel._id
    };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.secret, { expiresIn: process.env.accessTokenLife });
    const refreshToken = jsonwebtoken_1.default.sign(user, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife });
    //  response.setHeader('AccessToken', accessToken);
    //  response.setHeader('RefreshToken',refreshToken);
    const respons = {
        "status": `Hello ${userModel.userName}`,
        "AccessToken": accessToken,
        "RefreshToken": refreshToken,
        "User": userModel
    };
    return respons;
};
exports.checkJwt = (req, res, next) => {
    const accessToken = req.headers["accesstoken"];
    let jwtPayload;
    let newTokens;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(accessToken, process.env.secret);
        currentRole = jwtPayload.role;
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        if (err.name == 'TokenExpiredError') {
            res.status(403).send("access Token Expired");
            logger_1.default.info(`>>>> JWTHelper.checkJWT, with user err.name = ${JSON.stringify(err.name)}`);
            return;
        }
        if (err.name == 'JsonWebTokenError') {
            logger_1.default.info(`>>>> JWTHelper.checkJWT, with user err.name = ${JSON.stringify(err.name)}`);
            res.status(401).send("token is not valid");
            return;
        }
    }
    next();
};
function refreshTokens(res, req) {
    return __awaiter(this, void 0, void 0, function* () {
        let jwtPayload;
        try {
            jwtPayload = jsonwebtoken_1.default.verify(req.body.refreshToken, process.env.refreshTokenSecret);
        }
        catch (err) {
            if (err.name == 'TokenExpiredError') {
                logger_1.default.info(`>>>> JWTHelper.refreshToken(), with user err.name = ${JSON.stringify(err.name)}`);
                res.status(401).send('refresh token is not valid');
                return " refresh";
            }
        }
        const user = new user_1.default();
        user._id = jwtPayload._id;
        user.role = jwtPayload.role;
        return exports.generateTokens(user);
    });
}
exports.refreshTokens = refreshTokens;
//# sourceMappingURL=jwtHelper.js.map