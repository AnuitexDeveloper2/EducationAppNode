"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const role_1 = require("../enums/role");
const schema = mongoose_1.default.Schema;
exports.usersSchema = new schema({
    userName: { type: String, unique: true, required: true },
    email: { type: String, unique: true, required: true },
    avatar: { type: String },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    passwordHash: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    role: { type: role_1.Role, required: true, default: role_1.Role.User }
});
const userModel = mongoose_1.model('User', exports.usersSchema);
exports.default = userModel;
//# sourceMappingURL=user.js.map