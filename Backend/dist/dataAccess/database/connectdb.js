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
const env = __importStar(require("dotenv"));
const mongoose_1 = __importDefault(require("mongoose"));
env.config();
const connectionString = process.env.connectionString;
function connectdb() {
    mongoose_1.default.connect(connectionString, { useCreateIndex: true, useNewUrlParser: true });
}
exports.connectdb = connectdb;
//# sourceMappingURL=connectdb.js.map