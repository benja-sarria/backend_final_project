import dotenv from "dotenv";
dotenv.config();

export const config = {
    DB_PASSWORD: process.env.DB_PASSWORD,
    DATABASE: process.env.DATABASE,
    DB_SERVICE_ACCOUNT_URI: process.env.DB_SERVICE_ACCOUNT_URI,
    FRONT_URL: process.env.FRONT_URL,
    SESSION_DB: process.env.SESSION_DB,
};
