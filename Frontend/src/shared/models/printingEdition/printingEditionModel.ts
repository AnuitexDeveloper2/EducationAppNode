import { PrintingEditionType } from "../../enums/ptintingEditionType";
import { Currency } from "../../enums/Currency";

export interface PrintingEditionResoponseModel {
    count: number;
    data: Array<PrintingEditionModel>
}

export interface AuthorModel {
    id: number;
    name: String
    books: Array<PrintingEditionModel>
}


export interface PrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    authors: Array<AuthorModel>
    cover_image: string
}

export interface RequestPrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    authors: Array<AuthorModel>;
    cover_image: string
}

