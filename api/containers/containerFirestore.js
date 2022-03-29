import { createRequire } from "module"; // Bring in the ability to create the 'require' method
const require = createRequire(import.meta.url); // construct the require method

export class FirestoreContainer {
    constructor(DB_SERVICE_ACCOUNT_URI, type) {
        this.DB_SERVICE_ACCOUNT_URI = DB_SERVICE_ACCOUNT_URI;
        this.admin = require("firebase-admin");
        this.getFirestore = require("firebase-admin/firestore");
        this.serviceAccount = require(DB_SERVICE_ACCOUNT_URI);
        this.type = type;
        this.admin.initializeApp({
            credential: this.admin.credential.cert(this.serviceAccount),
        });
        this.db = this.getFirestore["getFirestore"]();
    }
    async create(object, cartId = "") {
        try {
            if (this.type === "products") {
                let docRef = this.db.collection("products").doc(`${object.id}`);
                console.log();
                await docRef.set(object);
                console.log("Product added correctly");
            }
            if (this.type === "cart") {
                console.log("entrando en cart");
                const query = await this.db.collection("cart");
                const doc = query.doc(`${cartId}`);
                const user = await doc.get();
                const response = user.data();
                if (!response) {
                    let docRef = this.db.collection("cart").doc(`${cartId}`);
                    console.log();

                    await docRef.set(object);
                    console.log("Cart created correctly");
                } else {
                    console.log("El cart ya existe");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async findAll({ filterObject = {}, projectionObject = {}, cartId = "" }) {
        try {
            // Continuar desde aquí
            if (this.type === "products") {
                const querySnapshot = await this.db
                    .collection("products")
                    .get();
                const docs = querySnapshot.docs;

                const response = docs.map((doc) => {
                    return {
                        id: doc.id,
                        code: doc.data().code,
                        timestamp: doc.data().timestamp,
                        name: doc.data().name,
                        desc: doc.data().desc,
                        price: doc.data().price,
                        stock: doc.data().stock,
                        thumbnail: doc.data().thumbnail,
                    };
                });

                const filteredResponse = response.filter((product) => {
                    if (filterObject.id) {
                        return (product.id = filterObject.id);
                    } else {
                        return product;
                    }
                });

                return filteredResponse;
            }
            if (this.type === "cart") {
                const query = await this.db.collection("cart");
                const doc = query.doc(`${filterObject.id}`);
                const user = await doc.get();
                const response = user.data();

                console.log(response);

                return "";
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async update({
        oneOrMany = "one",
        productOrCartId,
        fieldsToUpdate = {},
        operation = "",
    }) {
        try {
            if (this.type === "products") {
                const updateDoc = this.db
                    .collection("products")
                    .doc(`${productOrCartId}`);
                console.log(fieldsToUpdate.id);
                console.log(!fieldsToUpdate.id);
                if (!fieldsToUpdate.id) {
                    const updatedProduct = await updateDoc.update(
                        fieldsToUpdate
                    );
                    console.log(
                        `Product was updated correctly: ${updatedProduct}`
                    );
                } else {
                    console.log("You can't modify the product ID");
                }
            }
            if (this.type === "cart") {
                if (productOrCartId) {
                    if (operation === "addProduct") {
                        const updateDoc = await this.db
                            .collection("cart")
                            .doc(`${productOrCartId}`);

                        const cart = await updateDoc.get();

                        const updatedCart = await updateDoc.update({
                            products: [...cart.data().products, fieldsToUpdate],
                        });

                        console.log(updatedCart);
                    } else if (operation === "removeProduct") {
                        const updateDoc = await this.db
                            .collection("cart")
                            .doc(`${productOrCartId}`);

                        const cart = await updateDoc.get();
                        const actualProducts = await cart.data().products;
                        const filteredProducts = actualProducts.filter(
                            (product) => {
                                return product.id !== fieldsToUpdate.id;
                            }
                        );

                        const updatedCart = await updateDoc.update({
                            products: filteredProducts,
                        });

                        console.log("Removed product from cart");
                    }
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }

    async delete(idToDelete) {
        try {
            if (this.type === "products") {
                console.log(idToDelete);
                const deleteDoc = this.db
                    .collection("products")
                    .doc(`${idToDelete}`);
                const deletedProduct = await deleteDoc.delete();
                console.log(`Product Deleted, => ${deletedProduct}`);
            }
            if (this.type === "cart") {
                console.log(idToDelete);
                const deleteDoc = this.db
                    .collection("cart")
                    .doc(idToDelete.toString());
                const cart = await deleteDoc.get();
                console.log();
                if (await cart.data()) {
                    const deletedCart = await deleteDoc.delete();
                    console.log(`Cart Deleted, => ${deletedCart}`);
                } else {
                    console.log("We couldn't find a cart with that id");
                }
            }
        } catch (error) {
            console.log(error.message);
        }
    }
}
