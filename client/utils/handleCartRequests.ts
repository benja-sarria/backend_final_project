import { useContext } from "react";
import { ProductsContext } from "../components/context/ProductsProvider";
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
            url: `https://node-backend-project.glitch.me/api/cart`,
            method: "POST",
        });
        const currentCartId = await cartID.json(); // parses
        console.log(currentCartId);
        console.log("adding product");
        const addUrl = `https://node-backend-project.glitch.me/api/cart/${currentCartId.cartId}/products`;

        const addedProduct = await fetchFunction({
            url: addUrl,
            method: "POST",
            productToAdd,
            addProduct: true,
        });

        const currentCart = await addedProduct.json(); // parses

        return currentCart;
    } else {
        console.log("modifying existing cart");
        console.log(cartId);

        const addUrl = `https://node-backend-project.glitch.me/api/cart/${cartId}/products`;

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
