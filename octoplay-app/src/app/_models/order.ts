export interface Order {
    id?: string;
    price?: number;
    total_price?: number;
    delivry_cost?: number;
    status?: string;
    user_id?: string;
    address_id?: string;
    items?: [{}];
    address?: {};
    user?: {}
}