import { ProductModel } from "../models/ProductModel";
import { fetchFunction } from "./fetchFunction";

export const handleCartRequests = async (
    createCart: boolean,
    productToAdd: ProductModel | undefined = undefined,
    cartId: number | undefined = undefined
): Promise<any> => {
    if (createCart) {
        // Creates cart
        const cartID = await fetchFunction(
            `https://node-backend-project.glitch.me/api/cart`,
            "POST"
        );
        const currentCartId = await cartID.json(); // parses

        const addedProduct = await fetchFunction(
            `https://node-backend-project.glitch.me/api/cart/${currentCartId}/products`,
            "POST",
            productToAdd
        );

        const currentCart = await addedProduct.json(); // parses

        return currentCart;
    }

    const products = await fetch(
        `https://node-backend-project.glitch.me/api/products/${productId}`
    );
    const data = await products.json();
    setProductList(data);
};
