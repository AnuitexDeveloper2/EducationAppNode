import { PrintingEditionModel } from "../printingEdition/printingEditionModel";
import { UserModel } from "../user/user";

export interface Order {
    createdDate: string;
    userId: number;
    user: UserModel;
    orderItem: Array<OrderItem>;
    transactionId: string;
    amount: number;
    description: string;
}

export interface OrderItem {
    book: PrintingEditionModel;
    count: number;
    price: number;
    currency: string;
}

export interface Payment {
    transaction_id: string;
}

export interface OrderResponseModel {
    count: number;
    data: Array<Order>
}