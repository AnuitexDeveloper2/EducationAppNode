import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import * as repository  from "../repositories/printingEditionRepository";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { PrintingEdition } from "../api";

let printingEdition = new printingEditionModel();
 printingEdition.errors = new Array<string>();

export async function createAsync(printingEditionParam: printingEditionModel): Promise<Array<string>> {

    if (printingEditionParam == null) {
        printingEdition.errors.push('fields are empty');
        return printingEdition.errors;
    }

    const result = await repository.createAsync(printingEditionParam);
    
    if (!result) {
        printingEdition.errors.push("failed to save document");
    }

    return printingEdition.errors;
}

export async function removeAsync(id: string): Promise<Array<string>> {
    const result = await repository.removeAsync(id);
    
    if (!result) {
        printingEdition.errors.push('product did not find');
    }

    return printingEdition.errors;
}

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<Array<string>> {
    const result = await repository.updateAsync(printingEditionParam);
    
    if (!result) {
        printingEdition.errors.push('product did not find');
    }

    return printingEdition.errors;
}

export async function getAsync(filter: PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {

    const result = repository.getPrintingEditionsAsync(filter);

    return result;
}