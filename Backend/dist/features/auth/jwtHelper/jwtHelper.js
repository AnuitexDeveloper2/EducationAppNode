"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../../../dataAccess/entityModels/user"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let currentRole;
exports.generateTokens = (userModel, response) => {
    if (userModel == null) {
        return userModel;
    }
    const user = {
        "role": userModel.role,
        "id": userModel._id
    };
    const accessToken = jsonwebtoken_1.default.sign(user, process.env.secret, { expiresIn: process.env.accessTokenLife });
    const refreshToken = jsonwebtoken_1.default.sign(user, process.env.refreshTokenSecret, { expiresIn: process.env.refreshTokenLife });
    response.setHeader('AccessToken', accessToken);
    response.setHeader('RefreshToken', refreshToken);
    const respons = {
        "status": `Hello ${userModel.userName}`,
        "AccessToken": accessToken,
        "RefreshToken": refreshToken,
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
        }
        if (err.name == 'JsonWebTokenError') {
            res.status(401).send("token is not valid");
            return;
        }
    }
    next();
};
function refreshTokens(res, req) {
    let jwtPayload;
    try {
        jwtPayload = jsonwebtoken_1.default.verify(req.headers["refreshtoken"], process.env.refreshTokenSecret);
        res.locals.jwtPayload = jwtPayload;
    }
    catch (err) {
        if (err.name == 'TokenExpiredError') {
            res.status(401).send('refresh token is not valid');
            return;
        }
    }
    const user = new user_1.default();
    user._id = jwtPayload._id;
    user.role = jwtPayload.role;
    return exports.generateTokens(user, res);
}
exports.refreshTokens = refreshTokens;
//# sourceMappingURL=jwtHelper.js.map