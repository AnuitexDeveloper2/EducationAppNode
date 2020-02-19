import ordersModel from "../../../dataAccess/entityModels/orders";
import { validateWithJsonSchema } from "../../utils/validateWithJsonSchema";
import orderValidateSchema from "../operations/OrderRequest.schema.json";
import logger from "../../utils/logger";
import * as orderRepository from "../repository/orderRepository"
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";

export async function createOrderAsync(orderParam: ordersModel) {
    const validateResult = validateWithJsonSchema(orderParam, orderValidateSchema);
    logger.info(`>>>> orderService.createOrder(), with: orderParam = ${orderParam}`);

    if (!validateResult.valid) {
        logger.error(`>>>> orderService.createOrder(), invalid data = ${validateResult.errors}`);
        return {message:"Order parameters did not valid", error: validateResult.errors};
    }

    const result = await orderRepository.createOrder(orderParam);

    if (!result) {
        logger.error(`>>>> orderService.createOrder(), result = ${result}`);
        return "order did not create"
    }

    return "Ok"

} 

export async function getOrdersForUserAsync(id: number) {

}

export async function getOrdersForAdminAsync(filter: OrderFilter) {
        logger.info(`>>> orderService.getOrdersForAdmin(), with filter = ${filter}`)


}