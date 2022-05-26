import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { MongoDBUsersDao } from "../daos/users/mongoDBUsersDao.js";
import { formatUserForDB } from "../utils/users.utils.js";
import mongoose from "mongoose";

const User = new MongoDBUsersDao();

const salt = () => {
    return bcrypt.genSaltSync(10);
};
const createHash = (password) => {
    return bcrypt.hashSync(password, salt());
};

const isValidPassword = (user, password) => {
    if (user.password) {
        return bcrypt.compareSync(password, user.password);
    } else {
        return false;
    }
};

// Passport Local Strategy
passport.use(
    "login",
    new LocalStrategy(async (email, password, done) => {
        try {
            const user = await User.findByEmail(email);
            if (!isValidPassword(user, password)) {
                console.log("Invalid user or password");
                return done(null, false); // Enviamos false como segundo parámetro para que envíe al failureRedirect que pusimos en la ruta
            }
            // El primer parámetro indica un problema de sintaxis, de algún proceso asíncrono, etc. por eso va null
            return done(null, user);
        } catch (error) {
            return done(error);
        }
    })
);

passport.use(
    "register",
    new LocalStrategy(
        {
            passReqToCallback: true,
        },
        async (req, username, password, done) => {
            try {
                console.log(`ENTRANDO A REGISTER`);
                console.log(req.body);

                /* const userObject = {
                    name: req.body.name,
                    address: req.body.address,
                    age: req.body.age,
                    username: username,
                    password: createHash(password),
                    phoneNumber: req.body.phoneNumber,
                    avatar: req.body.avatar,
                };
                const newUser = formatUserForDB(userObject);
                const user = await User.createUser(newUser);
                // El primer parámetro indica un problema de sintaxis, de algún proceso asíncrono, etc. por eso va null
                if (user.password) {
                    console.log("User registration successful");
                    return done(null, user);
                } else {
                    return done(null, false);
                } */
            } catch (error) {
                console.log("Error signing up", error);
                return done(error);
            }
        }
    )
);

// Serialización - Passport cuando guarda los usuarios realiza este proceso
passport.serializeUser((user, done) => {
    console.log("Inside serializer");
    done(null, user._id);
});

// Deserialización - Passport cuando lee los usuarios realiza este proceso
passport.deserializeUser(async (id, done) => {
    console.log("Inside deserializer");
    const user = await User.getById(id);

    done(null, user);
});

export default passport;
