import { PrintingEditionType } from "../shared/enums/printingEditionType";
import { Currency } from "../shared/enums/currency";

export interface PrintingEdition {
    title: string;
    description: string;
    price: number;
    currency: Currency;
    productType: PrintingEditionType;
    removed_at: boolean;
    author_ids: Array<string>;
    cover_image: string;
}
