import { ProductModel } from "./ProductModel";

export interface CartModel {
    id: string;
    timestamp: number;
    products: [ProductModel];
}
