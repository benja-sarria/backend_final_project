import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

class Cart {
    constructor(fileName) {
        this.fileName = fileName;
    }

    async createFile() {
        const name = `${this.fileName}`;
        const code = name.split(".")[0];
        fs.writeFile(
            `${path.resolve(__dirname, "../data/carts")}/${this.fileName}`,
            `{"id": "${code}", "timestamp": ${Date.now()}, "products": []}`,
            (error) => {
                if (error) {
                    console.log(error.message);
                } else {
                    console.log("archivo creado exitosamente");
                }
            }
        );

        return await code;
    }

    async addProduct(object, quantity, cartId) {
        try {
            console.log(object);
            console.log(quantity);

            const fileExists = fs.existsSync(
                `${path.resolve(__dirname, "../data/carts")}/${cartId}.json`
            );

            if (fileExists) {
                console.log("Guardando el producto");
                const json = require(`${path.resolve(
                    __dirname,
                    "../data/carts"
                )}/${cartId}.json`);
                const productAlreadyInCart = json.products.filter((product) => {
                    return product.id === object.id;
                });
                console.log(productAlreadyInCart);
                if (productAlreadyInCart.length !== 0) {
                    console.log("el producto ya está en el carrito");
                    json.products.forEach((product) => {
                        if (product.id === productAlreadyInCart[0].id) {
                            product.quantity += quantity;
                        }
                    });
                    const parsedJson = JSON.stringify(json);
                    fs.writeFile(
                        `${path.resolve(
                            __dirname,
                            "../data/carts"
                        )}/${cartId}.json`,
                        `${parsedJson}`,
                        (error) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log("Producto añadido exitosamente");
                            }
                        }
                    );
                } else {
                    json.products.push({ ...object, quantity: quantity });
                    const parsedJson = JSON.stringify(json);
                    fs.writeFile(
                        `${path.resolve(
                            __dirname,
                            "../data/carts"
                        )}/${cartId}.json`,
                        `${parsedJson}`,
                        (error) => {
                            if (error) {
                                console.log(error.message);
                            } else {
                                console.log("Producto añadido exitosamente");
                            }
                        }
                    );
                }
                return json;
            } else {
                return {
                    error: "You're trying to add a product to a non-existent cart",
                };
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async removeItemById(id, prod_id) {
        try {
            const productWasInCart = {
                wasInCart: false,
            };
            const fileExists = fs.existsSync(
                `${path.resolve(__dirname, "../data/carts")}/${id}.json`
            );
            if (fileExists) {
                const json = require(`${path.resolve(
                    __dirname,
                    "../data/carts"
                )}/${id}.json`);

                const filteredProducts = json.products.filter((product) => {
                    if (product.id === prod_id) {
                        productWasInCart.wasInCart = true;
                    }
                    return product.id !== prod_id;
                });
                json.products = filteredProducts;

                const parsedJson = JSON.stringify(json);
                fs.writeFile(
                    `${path.resolve(__dirname, "../data/carts")}/${id}.json`,
                    `${parsedJson}`,
                    (error) => {
                        if (error) {
                            console.log(error.message);
                        } else {
                            console.log("Producto añadido exitosamente");
                        }
                    }
                );
                return productWasInCart;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getProductById(id) {
        try {
            const json = require("../data/products.json");

            const filteredJson = json.filter((product) => product.id === id);

            if (!filteredJson.length) {
                return null;
            }

            return filteredJson[0];
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async getAllProducts(cartId) {
        try {
            const fileExists = fs.existsSync(
                `${path.resolve(__dirname, "../data/carts")}/${cartId}.json`
            );
            if (!fileExists) {
                return {
                    error: "The cart you're trying to find doesn't exist",
                };
            } else {
                const json = require(`${path.resolve(
                    __dirname,
                    "../data/carts"
                )}/${cartId}.json`);

                return json;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteById(id) {
        try {
            const fileExists = fs.existsSync(
                `${path.resolve(__dirname, "../data/carts")}/${id}.json`
            );
            if (!fileExists) {
                return false;
            } else {
                fs.unlinkSync(
                    `${path.resolve(__dirname, "../data/carts")}/${id}.json`
                );
                return true;
            }
        } catch (error) {
            throw new Error(error.message);
        }
    }

    async deleteAllProducts() {
        try {
            const json = require("../data/products.json");

            if (!json.length) {
                const error = new Error();
                error.message = "We couldn't find any products on our DataBase";
                throw error;
            }

            const wipedOutJson = [];

            const parsedJson = JSON.stringify(wipedOutJson);

            await fs.writeFile(
                `${path.resolve(__dirname, "../data")}/${this.fileName}`,
                `${parsedJson}`,
                (error) => {
                    if (error) {
                        console.log(error.message);
                    } else {
                        console.log("Archivos eliminados exitosamente");
                    }
                }
            );
            console.log(wipedOutJson);
        } catch (error) {
            throw new Error(error.message);
        }
    }
}

export default Cart;
