import axios from "axios";
import {
  Orders,
  OrderItem,
  OrderResponseModel,
} from "../shared/models/order/orderModel";
import { BaseFilter } from "../shared/models/baseFilterModel";
import { baseUrl } from "../config";

export async function createOrder(order: Orders): Promise<boolean> {
  const result = await axios.post(`${baseUrl}/order`, order);
  return result.data;
}

export async function getMyOrder(id: string): Promise<Array<Orders>> {
  const result = await axios.get(`${baseUrl}/order/${id}`);
  return result.data;
}

export async function getOrders( filter: BaseFilter): Promise<OrderResponseModel> {
  const result = await axios.post(`${baseUrl}/admin/order`, filter);
  return result.data;
}
