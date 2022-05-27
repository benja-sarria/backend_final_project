import { MongoDBContainer } from "../../containers/containerMongoDB.js";

export class MongoDBProductsDao extends MongoDBContainer {
    constructor(DB_PASSWORD, DATABASE) {
        super(DB_PASSWORD, DATABASE, "products");
    }
}
