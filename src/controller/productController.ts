import type { Request, Response } from "express";
import ProductService, { IProductData } from "../services/ProductService";

class ProductController {
    private productService: ProductService;

    constructor() {
        this.productService = new ProductService();
    }

    // GET /api/v1/products
    getAll = async (_req: Request, res: Response): Promise<void> => {
        try {
            const products = await this.productService.getAll();
            res.json({ success: true, data: products });
        } catch (error) {
            console.error("getAll error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // GET /api/v1/products/:id
    getById = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.getById(req.params.id as string);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.json({ success: true, data: product });
        } catch (error) {
            console.error("getById error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // POST /api/v1/products
    create = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, price, image } = req.body;

            if (!name || !description || price === undefined || !image) {
                res.status(400).json({
                    error: "All fields are required: name, description, price, image",
                });
                return;
            }

            const data: IProductData = { name, description, price, image };
            const product = await this.productService.create(data);
            res.status(201).json({ success: true, data: product });
        } catch (error) {
            console.error("create error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // PUT /api/v1/products/:id
    update = async (req: Request, res: Response): Promise<void> => {
        try {
            const { name, description, price, image } = req.body;
            const data: Partial<IProductData> = {};

            if (name !== undefined) data.name = name;
            if (description !== undefined) data.description = description;
            if (price !== undefined) data.price = price;
            if (image !== undefined) data.image = image;


            const product = await this.productService.update(req.params.id as string, data);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.json({ success: true, data: product });
        } catch (error) {
            console.error("update error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };

    // DELETE /api/v1/products/:id
    delete = async (req: Request, res: Response): Promise<void> => {
        try {
            const product = await this.productService.delete(req.params.id as string);
            if (!product) {
                res.status(404).json({ error: "Product not found" });
                return;
            }
            res.json({ success: true, message: "Product deleted successfully" });
        } catch (error) {
            console.error("delete error:", error);
            res.status(500).json({ error: "Internal Server Error" });
        }
    };
}

export default ProductController;
