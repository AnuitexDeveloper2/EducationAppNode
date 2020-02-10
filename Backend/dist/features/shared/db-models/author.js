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
const schema = mongoose_1.default.Schema;
exports.authorSchema = new schema({
    name: { type: String, required: true }
});
const authorModel = mongoose_1.model('Author', exports.authorSchema);
exports.default = authorModel;
//# sourceMappingURL=author.js.map