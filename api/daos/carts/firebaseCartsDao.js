import { FirestoreContainer } from "../../containers/containerFirestore.js";

export class FirebaseCartsDao extends FirestoreContainer {
    constructor(DB_SERVICE_ACCOUNT_URI) {
        super(DB_SERVICE_ACCOUNT_URI, "cart");
    }
}
