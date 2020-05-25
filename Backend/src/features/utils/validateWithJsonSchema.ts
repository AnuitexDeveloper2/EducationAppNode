import { validate } from "jsonschema";

export function validateWithJsonSchema(value: any, schema: any) {
    return validate(value,schema);
}