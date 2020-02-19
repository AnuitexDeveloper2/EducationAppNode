export interface Orders {
    user_id: String;
    items: OrderItem;
    payment_info: Payment;
}

export interface OrderItem {
    printing_edition_id: string;
    count: string;
    price: number;
    currency: string;
}

export interface Payment {
    transaction_id: string;
}