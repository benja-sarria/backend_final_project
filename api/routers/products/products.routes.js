import express from "express";
import { allowAccess } from "../../middlewares/allowAccess.js";
import { productsInstance } from "../../middlewares/productInstance.js";

export const router = express.Router();
router.use(productsInstance);

// api/product/
// GET
// List all products or a specific product by ID
router.get("/:id?", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(req.query);
        if (!id) {
            const products = await req.products.getAllProducts();
            if (!products) {
                const error = new Error();
                error.message = "We couldn´t find any products";
                throw error;
            }
            res.json(products);
        } else {
            const products = await req.products.getProductById(+id);
            if (!products) {
                const error = new Error();
                error.message = "We couldn´t find any products";
                throw error;
            }
            res.json(products);
        }
    } catch (error) {
        throw new Error(error.message);
    }
});

// POST
// Create new product in DataBase
router.post("/", async (req, res) => {
    try {
        if (req.isAuth) {
            if (
                !req.body.name ||
                !req.body.desc ||
                !req.body.price ||
                !req.body.stock ||
                !req.body.thumbnail
            ) {
                const error = new Error();
                error.message =
                    "In order to add a product you need to provide the following properties: name, desc, price, stock, thumbnail";
                throw error;
            } else {
                if (!Number(req.body.price) || !Number(req.body.stock)) {
                    const error = new Error();
                    error.message =
                        "The values provided for price or stock are invalid. Check that they are numbers";
                    throw error;
                } else {
                    console.log("all data checks out");
                    const newProduct = {
                        ...req.body,
                        stock: Number(req.body.stock),
                        price: Number(req.body.price),
                    };
                    const response = await req.products.saveProduct(newProduct);
                    res.json(response);
                }
            }
        } else {
            const error = new Error();
            error.message = {
                error: -1,
                message: `path "/api/products/" POST method unauthorized`,
            };
            throw error;
        }
    } catch (error) {
        if (error.message.error) {
            res.json({
                error: error.message.error,
                message: error.message.message,
            });
        } else {
            throw new Error(error.message);
        }
    }
});

// PUT
// Update product by ID
router.put("/", [allowAccess], async (req, res) => {
    try {
        if (req.isAuth) {
            if (!req.body.id || !Number(req.body.id)) {
                const error = new Error();
                error.message =
                    "You must provide a valid Id in order to update a product";
                throw error;
            } else {
                if (
                    !req.body.name &&
                    !req.body.desc &&
                    !req.body.price &&
                    !req.body.stock &&
                    !req.body.thumbnail
                ) {
                    const error = new Error();
                    error.message =
                        "In order to update a product you need to provide at least one the following properties: name, desc, price, stock, thumbnail";
                    throw error;
                } else {
                    if (
                        (req.body.price && !Number(req.body.price)) ||
                        (req.body.stock && !Number(req.body.stock))
                    ) {
                        const error = new Error();
                        error.message =
                            "The values provided for price or stock are invalid. Check that they are numbers";
                        throw error;
                    } else {
                        console.log("all data checks out");
                        let updatedFields = {
                            ...req.body,
                            id: Number(req.body.id),
                        };

                        if (req.body.stock) {
                            updatedFields = {
                                ...updatedFields,
                                stock: Number(req.body.stock),
                            };

                            if (req.body.price) {
                                updatedFields = {
                                    ...updatedFields,
                                    price: Number(req.body.price),
                                };
                            }
                        } else if (req.body.price) {
                            updatedFields = {
                                ...updatedFields,
                                price: Number(req.body.price),
                            };
                        }

                        const response = await req.products.updateProduct(
                            Number(req.body.id),
                            updatedFields
                        );
                        res.json(response);
                    }
                }
            }
        } else {
            const error = new Error();
            error.message = {
                error: -1,
                message: `path "/api/products/" PUT method unauthorized`,
            };
            throw error;
        }
    } catch (error) {
        if (error.message.error) {
            res.json({
                error: error.message.error,
                message: error.message.message,
            });
        } else {
            throw new Error(error.message);
        }
    }
});

// DELETE
// Removes a product from the DataBase by ID
router.delete("/:id?", (req, res) => {
    try {
        console.log(req.body);
        if (req.isAuth) {
            const { id } = req.body;
            if (!id) {
                const error = new Error();
                error.message =
                    "You must provide a valid Id in order to delete a product.";
                throw error;
            } else {
                req.products.deleteById(Number(id));
                console.log("Product deleted successfully");
                res.json({
                    deleted: true,
                });
            }
        } else {
            const error = new Error();
            error.message = {
                error: -1,
                message: `path "/api/products/" DELETE method unauthorized`,
            };
            throw error;
        }
    } catch (error) {
        if (error.message.error) {
            res.json({
                error: error.message.error,
                message: error.message.message,
            });
        } else {
            throw new Error(error.message);
        }
    }
});
