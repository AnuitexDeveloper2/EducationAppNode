import { BaseFilterModel } from "./baseFilterModel";
import { PrintingEditionType } from "../enums/printingEditionType";

export interface PrintingEditionFilterModel extends BaseFilterModel {

    typeProduct: Array<PrintingEditionType>;
    minPrice: number;
    maxPrice: number;

}