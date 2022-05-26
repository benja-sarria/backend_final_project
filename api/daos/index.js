import { config } from "../config.js";
import { FirebaseCartsDao } from "./carts/firebaseCartsDao.js";
import { MongoDBCartsDao } from "./carts/mongoDBCartsDao.js";
import { FirebaseProductsDao } from "./products/firebaseProductDao.js";
import { MongoDBProductsDao } from "./products/mongoDBProductDao.js";
import { MongoDBUsersDao } from "./users/mongoDBUsersDao.js";

export class ProductsDao {
    constructor() {
        this.FirebaseProductsDao = new FirebaseProductsDao(
            config.DB_SERVICE_ACCOUNT_URI
        );
        this.MongoDBProductsDao = new MongoDBProductsDao(
            config.DB_PASSWORD,
            config.DATABASE
        );
    }
}
export class CartDao {
    constructor() {
        this.FirebaseCartsDao = new FirebaseCartsDao(
            config.DB_SERVICE_ACCOUNT_URI
        );
        this.MongoDBCartsDao = new MongoDBCartsDao(
            config.DB_PASSWORD,
            config.DATABASE
        );
    }
}

export class UsersDao {
    constructor() {
        this.MongoDBCartsDao = new MongoDBUsersDao(
            config.DB_PASSWORD,
            config.DATABASE
        );
    }
}
