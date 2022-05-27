import { MongoDBContainer } from "../../containers/containerMongoDB.js";

export class MongoDBUsersDao extends MongoDBContainer {
    constructor(DB_PASSWORD, DATABASE) {
        super(DB_PASSWORD, DATABASE, "users");
    }
}
