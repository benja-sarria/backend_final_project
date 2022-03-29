import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collection = "products";

export const ProductsSchema = new Schema({
    id: { type: Number, required: true },
    code: { type: Number, required: true },
    timestamp: { type: Number, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
    thumbnail: { type: String, required: true },
});

export const ProductsModel = mongoose.model(collection, ProductsSchema);
