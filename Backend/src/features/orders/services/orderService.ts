import ordersModel from "../../../dataAccess/entityModels/orders";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import orderValidateSchema from "../validateSchemas/OrderRequest.schema.json";
import logger from "../../utils/logger";
import * as orderRepository from "../repository/orderRepository"
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";
import idValidateSchema from "../../utils/IdRequest.schema.json"
import { BaseResponse } from "../../shared/models/baseResponse";

export async function createOrder(orderParam: ordersModel): Promise<boolean> {
    const validateResult = validateWithJsonSchema(orderParam, orderValidateSchema);
    logger.info(`>>>> orderService.createOrder(), with: orderParam = ${JSON.stringify(orderParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> orderService.createOrder(), invalid data = ${validateResult.errors}`);
        false
    }

    const result = await orderRepository.createOrder(orderParam);

    if (!result) {
        logger.error(`>>>> orderService.createOrder(), result = ${result}`);
        return false
    }

    return true

}

export async function getOrdersForUser(id: string): Promise<Array<ordersModel>> {
    const validateResult = validateWithJsonSchema(id, idValidateSchema)
    logger.info(`>>>> orderService.getOrdersForUser(), with: id = ${id}`)

    if (!validateResult) {
        logger.error(`>>>> orderService.getOrderForUser(), invalid data = ${validateResult.errors}`)
        return null
    }

    const result = await orderRepository.getOrdersForUser(id);

    if (result == null) {
        logger.error(`>>>> orderService.getOrderForUser(), result = user did not have any orders `)
    }
    return result;
}

export async function getOrdersForAdmin(filter: OrderFilter): Promise<BaseResponse<ordersModel>> {
    logger.info(`>>> orderService.getOrdersForAdmin(), with filter = ${JSON.stringify(filter)}`)

    const result = orderRepository.getOrdersForAdmin(filter);

    return result;
}