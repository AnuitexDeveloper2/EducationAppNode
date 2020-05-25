import ordersModel from "../../../dataAccess/entityModels/orders";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import orderValidateSchema from "../operations/OrderRequest.schema.json";
import logger from "../../utils/logger";
import * as orderRepository from "../repository/orderRepository"
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";
import idValidateSchema from "../../utils/IdRequest.schema.json"

export async function createOrderAsync(orderParam:ordersModel) {
    console.log(orderParam)
    const validateResult = validateWithJsonSchema(orderParam, orderValidateSchema);
    logger.info(`>>>> orderService.createOrder(), with: orderParam = ${JSON.stringify(orderParam)}`);

    if (!validateResult.valid) {
        logger.error(`>>>> orderService.createOrder(), invalid data = ${validateResult.errors}`);
        return {message:"Order parameters did not valid", error: validateResult.errors};
    }

    const result = await orderRepository.createOrderAsync(orderParam);

    if (!result) {
        logger.error(`>>>> orderService.createOrder(), result = ${result}`);
        return "order did not create"
    }

    return result

} 

export async function getOrdersForUserAsync(id: string) {
    const validateResult= validateWithJsonSchema(id,idValidateSchema)
    logger.info(`>>>> orderService.getOrdersForUser(), with: id = ${id}`)

    if (!validateResult) {
        logger.error(`>>>> orderService.getOrderForUser(), invalid data = ${validateResult.errors}`)
        return {message: "Invalid userId", error: validateResult.errors}
    }

    const result = await orderRepository.getOrdersForUserAsync(id);

    if (result == null) {
        logger.error(`>>>> orderService.getOrderForUser(), result = user did not have any orders `)
    }
    return result;
}

export async function getOrdersForAdminAsync(filter: OrderFilter) {
        logger.info(`>>> orderService.getOrdersForAdmin(), with filter = ${JSON.stringify(filter)}`)

        const result = orderRepository.getOrdersForAdminAsync(filter);

        return result;
}