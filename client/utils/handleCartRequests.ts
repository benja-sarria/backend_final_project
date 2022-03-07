import { ProductModel } from "../models/ProductModel";
import { fetchFunction } from "./fetchFunction";

export const handleCartRequests = async (
    createCart: boolean,
    productToAdd: ProductModel | undefined = undefined,
    cartId: number | undefined = undefined
): Promise<any> => {
    if (createCart) {
        // Creates cart
        console.log("creating cart");

        const cartID = await fetchFunction({
            url: `http://localhost:8080/api/cart`,
            method: "POST",
        });
        const currentCartId = await cartID.json(); // parses
        console.log(currentCartId);
        console.log("adding product");
        const addUrl = `http://localhost:8080/api/cart/${currentCartId.cartId}/products`;

        const addedProduct = await fetchFunction({
            url: addUrl,
            method: "POST",
            productToAdd,
            addProduct: true,
        });

        const currentCart = await addedProduct.json(); // parses

        return currentCart;
    }

    /*  const products = await fetch(
        `https://node-backend-project.glitch.me/api/products/${productId}`
    );
    const data = await products.json();
    setProductList(data); */
};
