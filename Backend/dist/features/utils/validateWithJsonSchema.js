"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsonschema_1 = require("jsonschema");
function validateWithJsonSchema(value, schema) {
    return jsonschema_1.validate(value, schema);
}
exports.validateWithJsonSchema = validateWithJsonSchema;
//# sourceMappingURL=validateWithJsonSchema.js.map