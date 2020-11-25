import axios from "axios";
import { PrintingEditionFilterModel } from "../shared/models/printingEdition/printingEditionFilterModel";
import {
  RequestPrintingEditionModel,
  PrintingEditionResoponseModel,
} from "../shared/models/printingEdition/printingEditionModel";
import { baseUrl } from '../config';

export async function getPrintingEdition( filter: PrintingEditionFilterModel): Promise<any> {
  const result = await axios.post( `${baseUrl}/admin/printing-edition`, filter);
  return result.data;
}

export async function getMainPage( filter: PrintingEditionFilterModel ): Promise<PrintingEditionResoponseModel> {
  const result = await axios.post(`${baseUrl}/home`, filter);
  return result.data;
}

export async function createPrintingEdition(printingEdition: RequestPrintingEditionModel) {
  const result = await axios.post(`${baseUrl}/admin/printing-edition/create`,printingEdition);
  return result.data;
}

export async function removePrintinEdition( printingEdition: any): Promise<boolean> {
  const _id = printingEdition.id;
  const result = await axios.post(`${baseUrl}/admin/printing-edition/remove`,{ _id });
  return result.data;
}

export async function editPrintingEdition(printingEdition: RequestPrintingEditionModel,id: string): Promise<boolean> {
  const data = { printingEdition: printingEdition, _id: id };
  const result = await axios.post(`${baseUrl}/admin/printing-edition/update`,data);
  return result.data;
}
