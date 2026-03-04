import mongoose, { Document, Schema } from "mongoose";

export interface IOrder extends Document {
    id: string;
    customer: string;
    phone: string;
    city: string;
    address: string;
    items: string;
    total: number;
    date: string;
}

const OrderSchema = new Schema<IOrder>(
    {
        customer: { type: String, required: true },
        phone: { type: String, required: true },
        city: { type: String, required: true },
        address: { type: String, required: true },
        items: { type: String, required: true },
        total: { type: Number, required: true },
        date: { type: String, required: true },
    },
    { timestamps: true }
);

// Virtual field so `id` equals the Mongo _id string
OrderSchema.virtual("id").get(function () {
    return this._id.toHexString();
});

OrderSchema.set("toJSON", { virtuals: true });
OrderSchema.set("toObject", { virtuals: true });

const Order = mongoose.model<IOrder>("Order", OrderSchema);

export default Order;
