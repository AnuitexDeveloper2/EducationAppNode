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
    name: { type: String },
    client_id: { type: String },
    client_secret: { type: String },
    redirect_uri: { type: String, default: "http://localhost:8000/home" },
    grant_types: { type: String },
    scope: { type: String },
    User: { type: Schema.Types.ObjectId, ref: 'User' },
});
const oAuthClient = mongoose_1.model('OAuthClient', oAuthClientSchema);
exports.default = oAuthClient;
//# sourceMappingURL=OAuthClient.js.map