import printingEditionModel from "../../../dataAccess/entityModels/printing-edition";
import * as repository from "../repositories/printingEditionRepository";
import { PrintingEditionFilterModel } from "../../shared/filterModels/printingEditionFilterModel";
import { BaseResponse } from "../../shared/models/baseResponse";
import { PrintingEdition } from "../api";
import printingEditionValidateSchema from "../validateSchemas/PrintingEditionRequest.schema.json";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import idValidateSchema from "../../utils/IdRequest.schema.json"
import logger from "../../utils/logger";
import { Converter } from "../../shared/currencyConverter";
import { Currency } from "../../printing-editions/enums";


export async function create(printingEditionParam: printingEditionModel): Promise<boolean> {
    const validateResult = validateWithJsonSchema(printingEditionValidateSchema, validateWithJsonSchema);
    logger.info(`>>>> printingEditionService.create(), with: printingEditionParam = ${JSON.stringify(printingEditionParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.create(), invalid data = ${validateResult.errors}`);
        return false;
    }

    const result = await repository.create(printingEditionParam);

    if (!result) {
        logger.error(`>>>> printingEditionService.create(), result = ${result}`);
        return false;
    }

    return true;
}

export async function remove(id: string): Promise<boolean> {
    const validateResult = validateWithJsonSchema(id, idValidateSchema);
    logger.info(`>>>> printingEditionService.remove(), with: printingEdition id = ${JSON.stringify(id)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.remove(), invalid data = ${validateResult.errors}`);
        return false
    }

    const result = await repository.remove(id);

    if (!result) {
        logger.error(`>>>> printingEditionService.remove(), result = ${result}`);
        return result;
    }

    return result;
}

export async function update(printingEditionParam: printingEditionModel, _id: string): Promise<any> {
    const validateResult = validateWithJsonSchema(printingEditionParam, printingEditionValidateSchema);
    logger.info(`>>>> printingEditionService.update(), with: printingEdition = ${JSON.stringify(printingEditionParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.update(), invalid data = ${validateResult.errors}`);
        return { message: "printingEdition parameters is not valide", error: validateResult.errors }
    }

    const result = await repository.update(printingEditionParam, _id);

    if (!result) {
        logger.error(`>>>> printingEditionService.update(), result = ${result}`);
        return "product did not update";
    }

    return result;
}


export async function getPrintingEditions(filter: PrintingEditionFilterModel): Promise<BaseResponse<PrintingEdition>> {
    console.log(filter.currency)
    logger.info(`>>>> printingEditionService.get() with: params=${JSON.stringify(filter)}`)
    const result = await repository.getPrintingEditions(filter);
    result.data.map((item: PrintingEdition) => (
        item.price = Converter(Currency.USD, filter.currency, item.price)
    ))
    return result;
}

export async function getById(id: string): Promise<any> {
    const validateResult = validateWithJsonSchema(id, idValidateSchema);
    logger.info(`>>>> printingEditionService.getById(), with: printingEdition id = ${id}`);

    if (!validateResult.valid) {
        logger.error(`>>>> printingEditionService.getById(), invalid data = ${validateResult.errors}`);
        return { message: "id parameters is not valide", error: validateResult.errors };
    }

    const result = repository.getById(id);

    if (!result) {
        logger.error(`>>>> printingEditionService.getById(), result = ${result}`);
        return { message: "printingEdition did not find", error: validateResult.errors }
    }

    return result;
}