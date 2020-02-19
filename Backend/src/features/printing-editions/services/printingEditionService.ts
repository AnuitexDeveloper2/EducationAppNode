import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import * as repository  from "../repositories/printingEditionRepository";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/db-models/BaseResponse";
import { PrintingEdition } from "../api";
import printingEditionValidateSchema from "../operations/PrintingEditionRequest.schema.json";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import idValidateSchema from "../../utils/IdRequest.schema.json"
import logger from "../../utils/logger";


export async function createAsync(printingEditionParam: printingEditionModel): Promise<any> {
     const validateResult = validateWithJsonSchema(printingEditionValidateSchema,validateWithJsonSchema);
     logger.info(`>>>> printingEditionService.create(), with: author = ${printingEditionParam}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.create(), invalid data = ${validateResult.errors}`);
        return {message: "printingEdition parameters is not valide" , error: validateResult.errors};
    }

    const result = await repository.createAsync(printingEditionParam);
    
    if (!result) {
        logger.error(`>>>> printingEditionService.create(), result = ${result}`);
       return ("failed to save document");
    }

    return result;
}

export async function removeAsync(id: string): Promise<any> {
    const validateResult = validateWithJsonSchema(id,idValidateSchema);
    logger.info(`>>>> printingEditionService.remove(), with: authorId = ${id}`);
    
    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.remove(), invalid data = ${validateResult.errors}`);
        return {message: "id parameters is not valide" , error: validateResult.errors};
    }

    const result = await repository.removeAsync(id);
    
    if (!result) {
        logger.error(`>>>> printingEditionService.remove(), result = ${result}`);
      return result;
    }

    return result;
}

export async function updateAsync(printingEditionParam: printingEditionModel): Promise<any> {
    const validateResult = validateWithJsonSchema(printingEditionValidateSchema,validateWithJsonSchema);
    logger.info(`>>>> printingEditionService.update(), with: printingEdition = ${printingEditionParam}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.remove(), invalid data = ${validateResult.errors}`);
        return {message: "printingEdition parameters is not valide" , error: validateResult.errors}
    }

    const result = await repository.updateAsync(printingEditionParam);
    
    if (!result) {
        logger.error(`>>>> printingEditionService.remove(), result = ${result}`);
        return "product did not update";
    }

    return result;
}

export async function getAsync(filter: PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {

    const result = repository.getPrintingEditionsAsync(filter);

    return result;
}