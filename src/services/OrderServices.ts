import Order, { IOrder } from "../model/orderModel";

// Plain data shape — avoids pulling in Mongoose Document methods
export interface IOrderData {
    customer: string;
    phone: string;
    city: string;
    address: string;
    items: string;
    total: number;
    date: string;
}

class OrderService {
    async getAll(): Promise<IOrder[]> {
        return Order.find().sort({ createdAt: -1 });
    }

    async getById(id: string): Promise<IOrder | null> {
        return Order.findById(id);
    }

    async create(data: IOrderData): Promise<IOrder> {
        return Order.create(data);
    }

    async update(id: string, data: Partial<IOrderData>): Promise<IOrder | null> {
        return Order.findByIdAndUpdate(id, data, { new: true });
    }

    async delete(id: string): Promise<IOrder | null> {
        return Order.findByIdAndDelete(id);
    }
}

export default OrderService;
