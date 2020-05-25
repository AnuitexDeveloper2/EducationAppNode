import { BaseFilterModel } from "./baseFilterModel";
import { PrintingEditionType } from "../enums/printingEditionType";
import { Currency } from "../enums/currency";
import { PrintingEditionSortType } from "../enums/PrintingEditionTableSort";

export interface PrintingEditionFilterModel extends BaseFilterModel {

    typeProduct: PrintingEditionType;
    minPrice: number;
    maxPrice: number;
    currency: Currency;
    tableSort: PrintingEditionSortType
}