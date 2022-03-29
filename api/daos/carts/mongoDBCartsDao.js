import { MongoDBContainer } from "../../containers/containerMongoDB.js";

export class MongoDBCartsDao extends MongoDBContainer {
    constructor(DB_PASSWORD, DATABASE) {
        super(DB_PASSWORD, DATABASE, "cart");
    }
}
