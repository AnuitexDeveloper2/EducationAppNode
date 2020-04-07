import axios from "axios"
import { PrintingEditionFilterModel } from "../shared/models/printingEdition/printingEditionFilterModel";
import { PrintingEditionResoponseModel, PrintingEditionModel } from "../shared/models/printingEdition/printingEditionModel";
import { PrintingEditionState } from "../redux/printingEdition/types";

export async function getPrintingEdition(filter: PrintingEditionFilterModel): Promise<PrintingEditionState> {
   const result = await axios.post('http://localhost:8000/admin/printing-edition',filter ).catch()
   return result.data
}

export async function createPrintingEdition(printingEdition: PrintingEditionModel) {
   debugger
   const result = await axios.post('http://localhost:8000/admin/printing-edition/create',printingEdition);
   return result.data
}