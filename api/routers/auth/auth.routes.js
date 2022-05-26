import express from "express";
import { config } from "../../config.js";

import passport from "../../middlewares/passport.js";

export const router = express.Router();

router.post(
    "/register",
    passport.authenticate("register", {
        failureRedirect: "/register-error",
        successRedirect: `${config.FRONT_URL}/`,
    })
);
router.post(
    "/login",
    passport.authenticate("login", {
        failureRedirect: `${config.FRONT_URL}/loginError`,
        successRedirect: `${config.FRONT_URL}/`,
    })
);
