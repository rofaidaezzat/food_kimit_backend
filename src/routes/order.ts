import { Router } from "express";
import OrderController from "../controller/orderController";

const orderRouter = Router();
const controller = new OrderController();

// GET    /api/v1/orders
orderRouter.get("/", controller.getAll);

// GET    /api/v1/orders/:id
orderRouter.get("/:id", controller.getById);

// POST   /api/v1/orders
orderRouter.post("/", controller.create);

// PUT    /api/v1/orders/:id
orderRouter.put("/:id", controller.update);

// DELETE /api/v1/orders/:id
orderRouter.delete("/:id", controller.delete);

export default orderRouter;
