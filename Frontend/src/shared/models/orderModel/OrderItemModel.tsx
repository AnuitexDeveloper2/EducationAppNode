import { Currency } from "../../enums/Currency";

export interface OrderItemModelItem {
    amount: number;
    currency: Currency;
    printingEditionId: number;
    printingEditionType: string;
    count: number;
    printingEditionName: string;
    printingEditionPrice: number;
}