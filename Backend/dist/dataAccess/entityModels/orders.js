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
exports.ordersSchema = new schema({
    user_id: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
    items: { type: [{
                printing_edition_id: {
                    type: mongoose_1.default.Schema.Types.ObjectId, ref: 'Printing_Edition', required: true
                },
                count: {
                    type: Number, required: true
                },
                price: {
                    type: Number, required: true
                },
                currency: {
                    type: String, default: "USD"
                }
            }] },
    transaction_id: { type: String },
    amount: { type: Number },
    createdDate: { type: Date, default: Date.now }
});
exports.ordersSchema.plugin(mongoose_paginate_1.default);
const ordersModel = mongoose_1.model('Orders', exports.ordersSchema);
exports.default = ordersModel;
//# sourceMappingURL=orders.js.map