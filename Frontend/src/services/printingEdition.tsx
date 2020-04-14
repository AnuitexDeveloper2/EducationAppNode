import axios from "axios"
import { PrintingEditionFilterModel } from "../shared/models/printingEdition/printingEditionFilterModel";
import { PrintingEditionResoponseModel, PrintingEditionModel, RequestPrintingEditionModel } from "../shared/models/printingEdition/printingEditionModel";
import { PrintingEditionState } from "../redux/printingEdition/types";

export async function getPrintingEdition(filter: PrintingEditionFilterModel): Promise<PrintingEditionState> {
   const result = await axios.post('http://localhost:8000/admin/printing-edition',filter ).catch()
   return result.data
}

export async function createPrintingEdition(printingEdition: RequestPrintingEditionModel) {
   const result = await axios.post('http://localhost:8000/admin/printing-edition/create',printingEdition);
   return result.data
}

export async function removePrintinEdition(printingEdition: any) {
   const _id = printingEdition.id
   debugger
   const result = await axios.post('http://localhost:8000/admin/printing-edition/remove',{_id})
   return result.data
}

export async function editPrintingEdition(printingEdition: RequestPrintingEditionModel) {
   debugger
   const result = await axios.post('http://localhost:8000/admin/printing-edition/update',printingEdition);
   return result.data
}
