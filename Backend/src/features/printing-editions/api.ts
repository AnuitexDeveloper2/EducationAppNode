import { PrintingEditionType } from "../shared/enums/printingEditionType";

export interface PrintingEdition {
    title: string;
    description: string;
    price: number;
    currency: string;
    productType: PrintingEditionType;
    removed_at: boolean;
    author_ids: Array<string>
}
