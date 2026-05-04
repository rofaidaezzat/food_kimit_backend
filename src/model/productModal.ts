import mongoose, { Document, Schema } from "mongoose";

export interface IProduct extends Document {
    id: string;
    name: string;
    description: string;
    price: number;
    image: string;

}

const ProductSchema = new Schema<IProduct>(
    {
        name: { type: String, required: true },
        description: { type: String, required: true },
        price: { type: Number, required: true },
        image: { type: String, required: true },

    },
    { timestamps: true }
);

// Virtual field so `id` equals the Mongo _id string
ProductSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

ProductSchema.set("toJSON", { virtuals: true });
ProductSchema.set("toObject", { virtuals: true });

const Product = mongoose.model<IProduct>("Product", ProductSchema);

export default Product;
