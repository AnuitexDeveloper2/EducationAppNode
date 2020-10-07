import { PrintingEditionModel } from "../printingEdition/printingEditionModel";

export interface Orders {
    createdDate: string;
    userId: number;
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
    data: Array<Orders>
}