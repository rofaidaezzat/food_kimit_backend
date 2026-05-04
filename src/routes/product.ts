import { Router } from "express";
import ProductController from "../controller/productController";

const productRouter = Router();
const controller = new ProductController();

// GET    /api/v1/products
productRouter.get("/", controller.getAll);

// GET    /api/v1/products/:id
productRouter.get("/:id", controller.getById);

// POST   /api/v1/products
productRouter.post("/", controller.create);

// PUT    /api/v1/products/:id
productRouter.put("/:id", controller.update);

// DELETE /api/v1/products/:id
productRouter.delete("/:id", controller.delete);

export default productRouter;
