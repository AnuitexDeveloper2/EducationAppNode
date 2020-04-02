import { PrintingEditionType } from "../../enums/ptintingEditionType";

export interface PrintingEditionResoponseModel {
    count: number;
    data: Array<PrintingEditionModel>
}

export interface AuthorModel {
    id: string;
    name: string
}


export interface PrintingEditionModel {
    title: string;
    description: string;
    price: number;
    currency: string;
    productType: PrintingEditionType;
    removed_at: boolean;
    author_ids: []
}