import { Currency } from "../../enums/Currency";
import { PrintingEditionType } from "../../enums/ptintingEditionType";

export interface OrderItemModelItem {
  printing_edition_id: string;
  count: number;
  price: number;
  currency: Currency;
  printingEditionType: PrintingEditionType;
  printingEditionName: string;
}
