const express = require('express');

function requireAdmin(req, res, next) {
    if (!req.user || req.user.role !== 'admin') {
        res.status(401);
        res.send({
            name: 'MissingUsernameError',
            message: 'You must be logged in as admin',
            error: '401'
        });
    }
    next();
};

function requireCustomer(req, res, next) {
    if (!req.user || req.user.role !== 'customer') {
        res.status(401);
        res.send({
            name: 'MissingUsernameError',
            message: 'You must be logged in as customer',
            error: '401'
        });
    }
    next();
};

module.exports = { requireCustomer, requireAdmin };