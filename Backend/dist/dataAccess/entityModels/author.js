"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const schema = mongoose_1.default.Schema;
exports.authorSchema = new schema({
    name: { type: String, required: true },
    createdDate: { type: Date, default: Date.now },
    removed_at: { type: Boolean, default: false },
    product_ids: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Printing_Edition', required: true }]
});
exports.authorSchema.plugin(mongoose_paginate_1.default);
const authorModel = mongoose_1.model('Author', exports.authorSchema);
exports.default = authorModel;
//# sourceMappingURL=author.js.map