const requireCustomer = (req, res, next) => {
    if (!req.customer) {
        res.status(401);
        res.send({
            name: 'MissingUsernameError',
            message: 'You must be logged in to perform this action',
            error: '401'
        });
    }
    next();
};

const requireAdmin = (req, res, next) => {
    if (!req.admin) {
        res.status(401);
        res.send({
            name: 'MissingUsernameError',
            message: 'You must be logged in to perform this action',
            error: '401'
        });
    }
    next();
};

module.exports = { requireCustomer, requireAdmin };