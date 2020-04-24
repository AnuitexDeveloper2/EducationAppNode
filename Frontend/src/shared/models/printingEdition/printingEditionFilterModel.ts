import { BaseFilter } from "../baseFilterModel";
import { Currency } from "../../enums/Currency";
import { PrintingEditionSortType } from "../../enums/printingEditionSortType";
import { PrintingEditionType } from "../../enums/ptintingEditionType";

export interface PrintingEditionFilterModel extends BaseFilter {

    currency: Currency
    tableSort: PrintingEditionSortType
    typeProduct: PrintingEditionType;
    minPrice: number;
    maxPrice: number;

}