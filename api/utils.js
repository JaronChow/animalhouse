function requireAdmin(req, res, next) {
    if (!req.role === 'admin') {
        res.status(401);
        res.send({
            name: 'MissingUsernameError',
            message: 'You must be logged in to perform this action',
            error: '401'
        });
    }
    next();
};

function requireCustomer(req, res, next) {
    if (!req.role === 'customer') {
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