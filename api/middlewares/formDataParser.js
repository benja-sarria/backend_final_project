import formidable from "formidable";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

export const formDataParser = async (req, res, next) => {
    console.log("En el middleware");
    var form = new formidable.IncomingForm();
    const __filename = fileURLToPath(import.meta.url);

    // 👇️ "/home/john/Desktop/javascript"
    const __dirname = path.dirname(__filename);
    const uploadFolder = path.join(__dirname, "public", "files");

    form.parse(req, function (err, fields, files) {
        req.body = { ...fields };

        var oldPath = files.avatar.filepath;
        console.log(files.avatar);
        var newPath =
            path.join("public/assets/") + files.avatar.originalFilename;
        console.log(newPath);
        var rawData = fs.readFileSync(oldPath);

        fs.writeFile(`${newPath}`, rawData, function (err) {
            if (err) {
                console.log(err);
                res.json({
                    message: "error",
                });
            }
            console.log("Successfully uploaded");
        });
        req.body.avatarUrl =
            path.join("public/assets/") + files.avatar.originalFilename;
        console.log(req.body);

        next();
    });
};
