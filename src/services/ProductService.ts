import Product from "../model/productModal";

export interface IProductData {
    name: string;
    description: string;
    price: number;
    image: string;

}

class ProductService {
    // Get all products
    async getAll(): Promise<IProductData[]> {
        return await Product.find().lean();
    }

    // Get product by ID
    async getById(id: string): Promise<IProductData | null> {
        return await Product.findById(id).lean();
    }

    // Create a new product
    async create(data: IProductData): Promise<IProductData> {
        const product = await Product.create(data);
        return product.toObject();
    }

    // Update a product by ID
    async update(id: string, data: Partial<IProductData>): Promise<IProductData | null> {
        return await Product.findByIdAndUpdate(id, data, { new: true }).lean();
    }

    // Delete a product by ID
    async delete(id: string): Promise<IProductData | null> {
        return await Product.findByIdAndDelete(id).lean();
    }
}

export default ProductService;
