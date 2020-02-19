import ordersModel from "../../../dataAccess/entityModels/orders";
import { OrderFilter } from "../../shared/filterModels/orderFilterModel";


export async function createOrder(orderParam: ordersModel): Promise<boolean> {
    const result = await ordersModel.create(orderParam);

    if (result == null) {
        return false
    }

    return true;
}

export async function getOrders(filter: OrderFilter) {

}