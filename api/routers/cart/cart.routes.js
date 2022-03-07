import express from "express";
import { allowAccess } from "../../middlewares/allowAccess.js";
import { cartInstance } from "../../middlewares/cartInstance.js";
import { productsInstance } from "../../middlewares/productInstance.js";

export const router = express.Router();

router.use([allowAccess, cartInstance, productsInstance]);

// GET
// Get cart's product list
router.get("/:id/products", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const error = new Error();
            error.message = "You must provide with a valid Id to search a cart";
            throw error;
        } else {
            const currentCart = await req.cart.getAllProducts(id);
            res.json(currentCart);
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// POST
// Create new cart
router.post("/", [allowAccess], async (req, res) => {
    try {
        const cartId = await req.cart.createFile();
        res.json({
            cartId: cartId,
        });
    } catch (error) {
        throw new Error(error.message);
    }
});

// Adds products to cart
router.post("/:id?/products", [allowAccess], async (req, res) => {
    try {
        const { id } = req.params;
        const { productId, quantity } = req.body;
        console.log(req.params);
        console.log(req.body);
        if (!id) {
            const error = new Error();
            error.message = "You must provide with a valid Id to search a cart";
            throw error;
        } else {
            if (
                !productId ||
                !quantity ||
                !Number(productId) ||
                !Number(quantity)
            ) {
                const error = new Error();
                error.message =
                    "You must provide with a valid product ID or quantity to add to your cart. Bare in mind that both Id and quantity must be numerical values";
                throw error;
            } else {
                const productToAdd = await req.products.getProductById(
                    +productId
                );
                console.log(productToAdd);
                const response = await req.cart.addProduct(
                    productToAdd,
                    +quantity,
                    id
                );
                res.json(response);
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// DELETE
// Deletes entire cart
router.delete("/:id", async (req, res) => {
    try {
        const { id } = req.params;
        if (!id) {
            const error = new Error();
            error.message =
                "You must provide a valid Id in order to ditch your cart";
            throw error;
        } else {
            const isDeleted = await req.cart.deleteById(id);
            console.log(isDeleted);
            if (!isDeleted) {
                res.json({
                    error: "The cart you're trying to ditch doesn't exist",
                });
            } else {
                res.json({ ditchedCart: isDeleted });
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// Removes products from carts
router.delete("/:id?/products/:id_prod", async (req, res) => {
    try {
        const { id, id_prod } = req.params;
        if (!id) {
            const error = new Error();
            error.message = "You must provide with a valid Id to search a cart";
            throw error;
        } else {
            if (!id_prod || !Number(id_prod)) {
                const error = new Error();
                error.message =
                    "You must provide with a valid product ID to remove it from your cart. Bare in mind that product ID must be a numerical value";
                throw error;
            } else {
                const response = await req.cart.removeItemById(id, +id_prod);
                res.json(response);
            }
        }
    } catch (error) {
        throw new Error(error.message);
    }
});
