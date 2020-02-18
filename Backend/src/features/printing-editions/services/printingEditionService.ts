import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import * as repository  from "../repositories/printingEditionRepository";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { PrintingEdition } from "../api";
import printingEditionValidateSchema from "../operations/PrintingEditionRequest.schema.json";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import idValidateSchema from "../../utils/IdRequest.schema.json"


export async function createAsync(printingEditionParam: printingEditionModel): Promise<any> {
     const validateResult = validateWithJsonSchema(printingEditionValidateSchema,validateWithJsonSchema)
    if (!validateResult.valid) {
        return {message: "printingEdition parameters is not valide" , error: validateResult.errors}
    }

    const result = await repository.createAsync(printingEditionParam);
    
    if (!result) {
       return ("failed to save document");
    }

    return result;
}

export async function removeAsync(id: string): Promise<any> {
    const validateResult = validateWithJsonSchema(id,idValidateSchema);
    
    if (!validateResult.valid) {
        return {message: "id parameters is not valide" , error: validateResult.errors}
    }

    const result = await repository.removeAsync(id);
    
    if (!result) {
      return result    
    }

    return result;
}

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<any> {
    const validateResult = validateWithJsonSchema(printingEditionValidateSchema,validateWithJsonSchema)
    if (!validateResult.valid) {
        return {message: "printingEdition parameters is not valide" , error: validateResult.errors}
    }
    const result = await repository.updateAsync(printingEditionParam);
    
    if (!result) {
        return "product did not update";
    }

    return result;
}

export async function getAsync(filter: PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {

    const result = repository.getPrintingEditionsAsync(filter);

    return result;
}