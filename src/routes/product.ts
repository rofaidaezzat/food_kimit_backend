import { Router } from "express";
import ProductController from "../controller/productController";
import { upload } from "../config/cloudinary";

const productRouter = Router();
const controller = new ProductController();

// GET    /api/v1/products
productRouter.get("/", controller.getAll);

// GET    /api/v1/products/:id
productRouter.get("/:id", controller.getById);

// POST   /api/v1/products
productRouter.post("/", upload.single("image"), controller.create);

// PUT    /api/v1/products/:id
productRouter.put("/:id", upload.single("image"), controller.update);

// DELETE /api/v1/products/:id
productRouter.delete("/:id", controller.delete);

export default productRouter;
