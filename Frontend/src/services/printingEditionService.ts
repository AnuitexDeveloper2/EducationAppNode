import axios from "axios"
import { PrintingEditionFilterModel } from "../shared/models/printingEdition/printingEditionFilterModel";
import { PrintingEditionState } from "../redux/printingEdition/types";

export async function getPrintingEdition(filter: PrintingEditionFilterModel): Promise<PrintingEditionState> {

   const result = await axios.post('http://localhost:8000/admin/printing-edition',filter ).catch()
   return result.data
}