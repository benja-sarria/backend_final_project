export const authMiddleware = (req, res, next) => {
    const isAuth = true;

    req.isAuth = isAuth;

    next();
};
