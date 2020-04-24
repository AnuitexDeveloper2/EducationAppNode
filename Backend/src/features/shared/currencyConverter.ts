import { Currency } from "./enums/currency";

interface Dictionary {
    [Key: string]: number;
}

 class SearchParameters {
    SearchFor: Dictionary = {};
}

var convertor = new SearchParameters();
convertor.SearchFor[Currency.USD] = 1;
convertor.SearchFor[Currency.UAH] = 25;
convertor.SearchFor[Currency.JPY] = 2.3;
convertor.SearchFor[Currency.GBP] = 0.7;
convertor.SearchFor[Currency.EUR] = 0.8;
convertor.SearchFor[Currency.CHF] = 1;


export function Converter(from: Currency, to: Currency, price: number): number {
    
    const result = price/ convertor.SearchFor[from] * convertor.SearchFor[to];
     
    return Math.round(result)
}