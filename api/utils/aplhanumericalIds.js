import * as fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const randomString = ({ length, chars }) => {
    let attempts = 0;
    let giveUp = false;
    let fileExists;
    let finalResult;
    do {
        let result = "";
        for (let i = length; i > 0; --i)
            result += chars[Math.floor(Math.random() * chars.length)];
        fileExists = fs.existsSync(
            `${path.resolve(__dirname, "../data/carts")}/${result}.json`
        );
        if (attempts === 4) {
            giveUp = true;
        }
        attempts += 1;
        console.log(attempts);
        finalResult = result;
    } while (fileExists && attempts < 5);

    if (giveUp) {
        return false;
    } else {
        return finalResult;
    }
};

export const parameters = {
    length: 12,
    chars: "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ",
};
