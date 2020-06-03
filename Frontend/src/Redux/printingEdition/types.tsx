import { PrintingEditionModel } from "../../shared/models/printingEdition/printingEditionModel";

export interface PrintingEditionState {
  count: number;
  data: Array<PrintingEditionModel>;
  isLoading: boolean;
  showCreate: boolean;
}
