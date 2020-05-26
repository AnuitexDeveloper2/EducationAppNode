import axios from "axios"
import { PrintingEditionFilterModel } from "../shared/models/printingEdition/printingEditionFilterModel";
import { RequestPrintingEditionModel, PrintingEditionResoponseModel } from "../shared/models/printingEdition/printingEditionModel";
import { PrintingEditionState } from "../redux/printingEdition/types";

export async function getPrintingEdition(filter: PrintingEditionFilterModel): Promise<PrintingEditionState> {
   const result = await axios.post('http://localhost:8000/admin/printing-edition',filter )
   return result.data
}

export async function getMainPage(filter:PrintingEditionFilterModel): Promise<PrintingEditionResoponseModel> {
   const result = await axios.post('http://localhost:8000/home',filter)
   return result.data;
}

export async function createPrintingEdition(printingEdition: RequestPrintingEditionModel): Promise<boolean> {
   const result = await axios.post('http://localhost:8000/admin/printing-edition/create',printingEdition);
   return result.data
}

export async function removePrintinEdition(printingEdition: any): Promise<boolean> {
   const _id = printingEdition.id
   const result = await axios.post('http://localhost:8000/admin/printing-edition/remove',{_id})
   return result.data
}

export async function editPrintingEdition(printingEdition: RequestPrintingEditionModel,id: string): Promise<boolean> {
   debugger
   const data ={printingEdition: printingEdition, _id: id }
   const result = await axios.post('http://localhost:8000/admin/printing-edition/update',data);
   return result.data
}
