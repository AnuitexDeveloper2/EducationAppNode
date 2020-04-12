"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const jwt = __importStar(require("jsonwebtoken"));
const env = __importStar(require("dotenv"));
const role_1 = require("../enums/role");
env.config();
const jwtSecret = process.env.refreshTokenSecret;
function checkPermission(currentRole) {
    return (req, res, next) => {
        const refreshToken = req.headers["refreshtoken"];
        const jwtPayload = jwt.verify(refreshToken, jwtSecret);
        if (role_1.Role[jwtPayload.role] !== role_1.Role[currentRole]) {
            res.status(401).send(' you are dont permission');
            return;
        }
        next();
    };
}
exports.checkPermission = checkPermission;
//# sourceMappingURL=accessController.js.map