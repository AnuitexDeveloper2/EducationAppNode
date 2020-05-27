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
const Schema = mongoose_1.default.Schema;
var oAuthClientSchema = new Schema({
    user_Id: { type: Schema.Types.ObjectId, ref: 'User' },
    provider: { type: String, default: "Facebook" }
});
const oAuthClient = mongoose_1.model('userLogins', oAuthClientSchema);
exports.default = oAuthClient;
//# sourceMappingURL=userLogins.js.map