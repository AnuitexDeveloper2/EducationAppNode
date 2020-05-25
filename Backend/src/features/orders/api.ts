export interface Orders {
    user_id: string;
    items: Array<OrderItem>;
    transaction_id: string;
    amount:number;
    date: string
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