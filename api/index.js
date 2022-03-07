import express from "express";
import { authMiddleware } from "./middlewares/authMiddleware.js";
import { router } from "./routers/index.js";
import dotenv from "dotenv";
import { allowAccess } from "./middlewares/allowAccess.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8080;

// Middlewares
app.use(authMiddleware);
app.use(allowAccess);
app.use(express.static("public"));

// Routes
app.use("/api", router);

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
