import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { router } from "./routers/index.js";
import dotenv from "dotenv";
import { allowAccess } from "./middlewares/allowAccess.js";
import { MongoDBContainer } from "./containers/containerMongoDB.js";
import { MongoDBProductsDao } from "./daos/products/mongoDBProductDao.js";
import { MongoDBCartsDao } from "./daos/carts/mongoDBCartsDao.js";
import { FirestoreContainer } from "./containers/containerFirestore.js";
import { FirebaseProductsDao } from "./daos/products/firebaseProductDao.js";
import { FirebaseCartsDao } from "./daos/carts/firebaseCartsDao.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(authMiddleware);
app.use(allowAccess);
app.use(express.static("public"));

// Routes
app.use("/api", router);

app.get("/test", async (req, res) => {
    /*  const instance = new MongoDBCartsDao(
        process.env.DB_PASSWORD,
        process.env.DATABASE
    );
 */
    /* console.log(
        await instance.findAll({}, { name: 1, desc: 1, price: 1, _id: 0 })
    ); */
    /* console.log(
        await instance.findById(1, { name: 1, desc: 1, price: 1, _id: 0 })
    ); */
    /* instance.create(
        {
            id: "asdsa9635",
            timestamp: 1233453423,
            products: {
                id: 1,
                code: 2,
                timestamp: 23,
                name: "Producto prueba",
                desc: "Producto de prueba",
                price: 8000,
                stock: 40,
                thumbnail: "some url",
            },
        },
        "asdsa9635"
    ); */
    // console.log(await instance.findAll({ cartId: "asdsa81325" }));
    /* console.log(
        await instance.update({
            filterObject: { id: "asdsa81325" },
            fieldsToUpdate: {
                id: 12,
                code: 2,
                timestamp: 23,
                name: "Producto prueba 12",
                desc: "Producto de prueba 12",
                price: 8000,
                stock: 40,
                thumbnail: "some url",
            },
            operation: "addProduct",
        })
    ); */
    /* console.log(
        await instance.update({
            filterObject: { id: "asdsa81325" },
            fieldsToUpdate: {
                id: 12,
            },
            operation: "removeProduct",
        })
    ); */
    /*  console.log(
        await instance.delete({
            idToDelete: "asdsa81325",
        })
    );
 */
    /*   instance.update(
        "one",
        { id: 1 },
        { name: "Producto de Prueba modificado" }
    ); */
    // instance.delete("one", { id: 1 });
    // const instance = new FirebaseCartsDao(process.env.DB_SERVICE_ACCOUNT_URI);
    /*  instance.create({
        id: 9,
        code: 2,
        timestamp: 23,
        name: "Producto prueba 12",
        desc: "Producto de prueba 12",
        price: 8000,
        stock: 40,
        thumbnail: "some url",
    }); */
    /*  instance.create(
        {
            id: "asdsa9639123123",
            timestamp: 1233453423,
            products: [
                {
                    id: 1,
                    code: 2,
                    timestamp: 23,
                    name: "Producto prueba",
                    desc: "Producto de prueba",
                    price: 8000,
                    stock: 40,
                    thumbnail: "some url",
                },
            ],
        },
        "asdsa9639123123"
    ); */
    // console.log(await instance.findAll({ filterObject: { id: 9 } }));
    /*  console.log(
        await instance.findAll({ filterObject: { id: "asdsa9639874" } })
    ); */
    /* await instance.update({
        productOrCartId: "asdsa9639123123",
        fieldsToUpdate: {
            id: 25,
            code: 2,
            timestamp: 23,
            name: "Producto prueba",
            desc: "Producto de prueba",
            price: 8000,
            stock: 40,
            thumbnail: "some url",
        },
        operation: "addProduct",
    }); */
    /* await instance.update({
        productOrCartId: "asdsa9639123123",
        fieldsToUpdate: {
            id: 1,
        },
        operation: "removeProduct",
    }); */
    // instance.delete(2);
});

// Invalid Routes Handling
app.get("*", function (req, res) {
    console.log(req);
    res.json({
        error: -2,
        description: `Route: "${req.originalUrl}, Method: ${req.method}, not implemented" `,
    });
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
