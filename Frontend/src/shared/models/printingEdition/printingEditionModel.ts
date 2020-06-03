import { PrintingEditionType } from "../../enums/ptintingEditionType";
import { Currency } from "../../enums/Currency";

export interface PrintingEditionResoponseModel {
    count: number;
    data: Array<PrintingEditionModel>
}

export interface AuthorModel {
    _id: string;
    name: String
    product_ids: Array<string>
}


export interface PrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    author_ids: Array<AuthorModel>
    cover_image: string
}

export interface RequestPrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    author_ids: Array<string>;
    cover_image: string
}

