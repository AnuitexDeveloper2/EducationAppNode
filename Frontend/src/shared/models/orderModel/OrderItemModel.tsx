import { Currency } from "../../enums/Currency";
import { PrintingEditionType } from "../../enums/ptintingEditionType";

export interface OrderItemModelItem {
  bookIds: number;
  count: number;
  price: number;
  currency: Currency;
  printingEditionType: PrintingEditionType;
  printingEditionName: string;
  printingEditionImage: string;
}
