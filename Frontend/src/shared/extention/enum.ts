export function enumSelector(definition): Array<string> {
    let enumValues: Array<string> = [];
    for (let value in definition) {
        if (value.length > 1) {
            enumValues.push(value);
        }
    }
    return enumValues;
}

export function enumDecoder(value: string): number {
    switch (value) {
        case 'Book' || 'USD':
            return 0;
        case 'Newspaper' || 'EUR':
            return 1;
        case 'Magazine' || 'GBR':
            return 2;
        case 'CHF':
            return 3;
        case 'JPY':
            return 4;
        case 'UAH':
            return 5
        default: return 0
    }
}