import express from "express";
import { router as productRoutes } from "./products/products.routes.js";
import { router as cartRoutes } from "./cart/cart.routes.js";
import { allowAccess } from "../middlewares/allowAccess.js";
import { router as authRoutes } from "./auth/auth.routes.js";
import { config } from "../config.js";
import { serialize } from "cookie";

import passport from "../middlewares/passport.js";
import { formDataParser } from "../middlewares/formDataParser.js";

export const router = express.Router();

// Middlewares
router.use(express.json());
router.use(express.urlencoded({ extended: true }));
router.use(allowAccess);

router.use("/products", productRoutes);
router.use("/cart", cartRoutes);
router.use("/auth", authRoutes);

router.post(
    "/register",
    [formDataParser],
    passport.authenticate("register", {
        failureRedirect: "/register-error",
    }),
    (req, res) => {
        console.log("se registró");
        console.log(config.FRONT_URL);
        console.log(req);

        const serialized = serialize("tkn", req.user._id, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 60 * 60 * 24,
            path: "/",
        });

        res.setHeader("Set-Cookie", serialized);

        res.send({
            loggedIn: true,
            user: req.user,
        });
    }
);
router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: `${config.FRONT_URL}/loginError`,
        successRedirect: `${config.FRONT_URL}/`,
    })
);
