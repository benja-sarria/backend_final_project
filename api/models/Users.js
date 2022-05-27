import mongoose from "mongoose";

const Schema = mongoose.Schema;

const collection = "users";

export const UsersSchema = new Schema({
    id: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    name: { type: String, required: true },
    address: { type: String, required: true },
    age: { type: Number, required: true },
    phoneNumber: { type: String, required: true },
    avatarUrl: { type: String, required: true },
    createdAt: { type: String, required: true },
});

export const UsersModel = mongoose.model(collection, UsersSchema);
