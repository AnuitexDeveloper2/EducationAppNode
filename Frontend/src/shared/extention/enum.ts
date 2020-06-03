export function enumSelector(definition) {
    let enumValues: Array<string> = [];
    for (let value in definition) {
        if (value.length > 1) {
            enumValues.push(value);
        }
    }
    return enumValues;
}