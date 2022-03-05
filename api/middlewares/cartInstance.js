import { parameters, randomString } from "../utils/aplhanumericalIds.js";
import Cart from "../utils/cartMethods.js";

export const cartInstance = (req, res, next) => {
    const cartId = randomString(parameters);
    console.log(cartId);
    if (typeof cartId !== "string") {
        const error = new Error();
        error.message = "All the cart identifiers are taken";
        throw error;
    } else {
        console.log(cartId);
        req.cartId = cartId;
        const cart = new Cart(`${cartId}.json`);
        req.cart = cart;
        next();
    }
};
