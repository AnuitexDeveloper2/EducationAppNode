import axios from "axios";
import {
  Orders,
  OrderItem,
  OrderResponseModel,
} from "../shared/models/order/orderModel";
import { BaseFilter } from "../shared/models/baseFilterModel";

export async function createOrder(order: Orders): Promise<boolean> {
  const result = await axios.post("http://localhost:8000/order", order);
  return result.data;
}

export async function getMyOrder(_id: string): Promise<Array<OrderItem>> {
  const result = await axios.post(`http://localhost:8000/order/myOrders`, {_id});
  return result.data;
}

export async function getOrders( filter: BaseFilter): Promise<OrderResponseModel> {
  const result = await axios.post(`http://localhost:8000/admin/order`, filter);
  return result.data;
}
