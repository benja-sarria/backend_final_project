import mongoose from "mongoose";
import { ProductsSchema } from "./Products.js";

const Schema = mongoose.Schema;

const collection = "carts";

const CartSchema = new Schema({
    id: { type: String, required: true },
    timestamp: { type: Number, required: true },
    products: [ProductsSchema],
});

export const CartsModel = mongoose.model(collection, CartSchema);
