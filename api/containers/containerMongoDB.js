import mongoose from "mongoose";
import { CartsModel } from "../models/Carts.js";
import { ProductsModel } from "../models/Products.js";

export class MongoDBContainer {
    constructor(DB_PASSWORD, DATABASE, type) {
        this.DATABASE = DATABASE;
        this.DB_PASSWORD = DB_PASSWORD;
        this.DB_URI = `mongodb+srv://benjasarria:${this.DB_PASSWORD}@coderhouse-ecommerce.rogfv.mongodb.net/${this.DATABASE}?retryWrites=true&w=majority`;
        this.type = type;
    }
    async create(object, cartId = "") {
        try {
            console.log(object);
            await mongoose.connect(this.DB_URI);
            console.log(`Database connected correctly!`);

            if (this.type === "products") {
                await ProductsModel.create(object);
                console.log("Product added correctly");
            }
            if (this.type === "cart") {
                console.log("entrando en cart");
                console.log(
                    (await CartsModel.find({ id: cartId })).length === 0
                );
                if ((await CartsModel.find({ id: cartId })).length === 0) {
                    await CartsModel.create(object);
                    console.log("Cart creado");
                } else {
                    console.log("El cart ya existe");
                }
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            mongoose.disconnect();
        }
    }

    async findAll({ filterObject = {}, projectionObject = {}, cartId = "" }) {
        try {
            await mongoose.connect(this.DB_URI);
            console.log(`Database connected correctly!`);
            if (this.type === "products") {
                const products = await ProductsModel.find(
                    filterObject,
                    projectionObject
                );

                return products;
            }
            if (this.type === "cart") {
                const cart = await CartsModel.find({ id: cartId });

                return cart;
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            mongoose.disconnect();
        }
    }

    async findById(id, projectionObject = {}) {
        try {
            await mongoose.connect(this.DB_URI);
            console.log(`Database connected correctly!`);

            if (this.type === "products") {
                const products = await ProductsModel.find(
                    { id: id },
                    projectionObject
                );
                return products;
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            mongoose.disconnect();
        }
    }

    async update({
        oneOrMany = "one",
        filterObject,
        fieldsToUpdate = {},
        operation = "",
    }) {
        try {
            await mongoose.connect(this.DB_URI);
            console.log(`Database connected correctly!`);

            if (this.type === "products") {
                oneOrMany.toLowerCase() === "one"
                    ? await ProductsModel.updateOne(filterObject, {
                          $set: fieldsToUpdate,
                      })
                    : oneOrMany.toLowerCase() === "many" &&
                      (await ProductsModel.updateMany(filterObject, {
                          $set: fieldsToUpdate,
                      }));
                console.log("Product updated correctly");
            }
            if (this.type === "cart") {
                const id = filterObject.id;
                if (id) {
                    if (operation === "addProduct") {
                        await CartsModel.updateOne(
                            { id: id },
                            {
                                $push: { products: fieldsToUpdate },
                            }
                        );
                        console.log("Added product to cart");
                    } else if (operation === "removeProduct") {
                        const actualCart = await CartsModel.find(
                            { id: id },
                            { products: 1, _id: 0 }
                        ).lean();
                        const { products } = actualCart[0];
                        const updatedCart = products.map((product) => {
                            if (product.id !== fieldsToUpdate.id) {
                                return product;
                            }
                        });

                        await CartsModel.updateOne(
                            { id: id },
                            {
                                $set: { products: updatedCart },
                            }
                        );
                        console.log("Removed product from cart");
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            mongoose.disconnect();
        }
    }

    async delete({ oneOrMany = "one", idToDelete }) {
        try {
            await mongoose.connect(this.DB_URI);
            console.log(`Database connected correctly!`);
            if (this.type === "products") {
                oneOrMany.toLowerCase() === "one"
                    ? await ProductsModel.deleteOne({ id: idToDelete })
                    : oneOrMany.toLowerCase() === "many" &&
                      (await ProductsModel.deleteMany({ id: idToDelete }));

                console.log("Product deleted correctly");
            }
            if (this.type === "cart") {
                let message;
                if ((await CartsModel.find({ id: idToDelete })).length > 0) {
                    message = "Cart deleted correctly";
                } else {
                    message = "Couldn't find any cart by that ID";
                }
                await CartsModel.deleteOne({ id: idToDelete });

                console.log(message);
            }
        } catch (error) {
            console.log(error.message);
        } finally {
            mongoose.disconnect();
        }
    }
}
