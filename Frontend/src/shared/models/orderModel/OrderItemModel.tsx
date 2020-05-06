import { Currency } from "../../enums/Currency";
import { PrintingEditionType } from "../../enums/ptintingEditionType";

export interface OrderItemModelItem {
    // amount: number;
    // currency: Currency;
    // printingEditionId: string;
    // printingEditionType: string;
    // count: number;
    // printingEditionName: string;
    // printingEditionPrice: number;
    printing_edition_id: string;
    count: number;
    price: number;
    currency: Currency;
    printingEditionType: PrintingEditionType;
    printingEditionName: string;
}