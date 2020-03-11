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
const printingEditionType_1 = require("../../features/shared/enums/printingEditionType");
const mongoose_paginate_1 = __importDefault(require("mongoose-paginate"));
const schema = mongoose_1.default.Schema;
exports.printingEditionSchema = new schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    cover_image: { type: String },
    removed_at: { type: Boolean, default: false },
    type: { type: printingEditionType_1.PrintingEditionType, required: true },
    price: { type: Number, required: true },
    currency: { type: String, default: 'USD' },
    author_ids: [{ type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Author', required: true }]
});
exports.printingEditionSchema.plugin(mongoose_paginate_1.default);
const printingEditionModel = mongoose_1.model('Printing_Edition', exports.printingEditionSchema);
exports.default = printingEditionModel;
//# sourceMappingURL=printing-edition.js.map