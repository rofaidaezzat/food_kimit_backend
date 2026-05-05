import type { Request, Response } from "express";
import OrderService, { IOrderData } from "../services/OrderServices";

class OrderController {
    private orderService: OrderService;

    constructor() {
        this.orderService = new OrderService();
    }

    // GET /api/v1/orders
    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const orders = await this.orderService.getAll();
            res.json({ success: true, data: orders });
        } catch (error) {
            console.error("getAll error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // GET /api/v1/orders/:id
    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await this.orderService.getById(req.params.id as string);
            if (!order) {
                res.status(404).json({ error: "Order not found" });
                return;
            }
            res.json({ success: true, data: order });
        } catch (error) {
            console.error("getById error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // POST /api/v1/orders
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body || {};
            const { customer, phone, city, address, items, total, date } = body;

            if (!customer || !phone || !city || !address || !items || total === undefined || !date) {
                res.status(400).json({
                    error: "All fields are required: customer, phone, city, address, items, total, date",
                });
                return;
            }

            const data: IOrderData = { customer, phone, city, address, items, total, date };
            const order = await this.orderService.create(data);
            res.status(201).json({ success: true, data: order });
        } catch (error: any) {
            console.error("create error FULL:", error);
            res.status(500).json({ error: "Internal Server Error", detail: error?.message || String(error) });
        }
    };

    // PUT /api/v1/orders/:id
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const body = req.body || {};
            const order = await this.orderService.update(req.params.id as string, body);
            if (!order) {
                res.status(404).json({ error: "Order not found" });
                return;
            }
            res.json({ success: true, data: order });
        } catch (error) {
            console.error("update error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // DELETE /api/v1/orders/:id
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const order = await this.orderService.delete(req.params.id as string);
            if (!order) {
                res.status(404).json({ error: "Order not found" });
                return;
            }
            res.json({ success: true, message: "Order deleted successfully" });
        } catch (error) {
            console.error("delete error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default OrderController;
