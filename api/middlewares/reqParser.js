export const reqParser = async (req, res, next) => {
    console.log(req.body);
    req.email = req.body.email;
    req.password = req.body.password;

    next();
};
