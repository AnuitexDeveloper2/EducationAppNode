import { PrintingEditionModel } from "../printingEdition/printingEditionModel";

export interface AuthorModel {
  id: number;
  name: string;
  books: Array<PrintingEditionModel>;
}

export interface AuthorResponseModel {
  count: number;
  data: Array<AuthorModel>;
}
