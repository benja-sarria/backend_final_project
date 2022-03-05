import Products from "../utils/productMethods.js";

export const productsInstance = (req, res, next) => {
    const products = new Products("products.json");

    req.products = products;
    next();
};
