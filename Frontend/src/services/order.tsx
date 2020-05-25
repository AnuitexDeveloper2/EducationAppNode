import  axios  from "axios";
import { Orders } from "../shared/models/order/orderModel";
import { BaseFilter } from "../shared/models/baseFilterModel";

export async function createOrder (order:Orders) {
    const result = await axios.post('http://localhost:8000/order',order);
    return result.data;
}

export async function getMyOrder (_id:string) {
    const result = await axios.post(`http://localhost:8000/order/myOrders`,{_id});
    return result.data
}

export async function getOrders (filter: BaseFilter) {
    const result = await axios.post(`http://localhost:8000/admin/order`,filter)
    return result.data
}