"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const currency_1 = require("./enums/currency");
class SearchParameters {
    constructor() {
        this.SearchFor = {};
    }
}
var convertor = new SearchParameters();
convertor.SearchFor[currency_1.Currency.USD] = 1;
convertor.SearchFor[currency_1.Currency.UAH] = 25;
convertor.SearchFor[currency_1.Currency.JPY] = 2.3;
convertor.SearchFor[currency_1.Currency.GBP] = 0.7;
convertor.SearchFor[currency_1.Currency.EUR] = 0.8;
convertor.SearchFor[currency_1.Currency.CHF] = 1;
function Converter(from, to, price) {
    const result = price / convertor.SearchFor[from] * convertor.SearchFor[to];
    return Math.round(result);
}
exports.Converter = Converter;
//# sourceMappingURL=currencyConverter.js.map