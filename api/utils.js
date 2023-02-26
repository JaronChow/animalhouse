const requireUser = (req, res, next) => {
    if (!req.user) {
        res.status(401);
        res.send({
            name: 'MissingUserError',
            message: 'You must be logged in to perform this action',
            error: '401'
        });
    }
    next();
};

module.exports = { requireUser };