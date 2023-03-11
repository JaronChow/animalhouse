const express = require('express');
const { createShippingInfo, getShippingInfoById, updateShippingInfo } = require('../db/models/shipping');
const router = express.Router();
const { requireCustomer } = require('./utils');

router.post('/', requireCustomer, async (req, res, next) => {
    const {
        customerId,
        address,
        city,
        state,
        zipcode
    } = req.body;

    try {
        const newShipping = await createShippingInfo({
            customerId,
            address,
            city,
            state,
            zipcode
        });

        if (newShipping) {
            res.send(newShipping);
        } else {
            res.send({
                error: 'createShippingError',
                name: 'createShippingError',
                message: `Unable to create shipping address for customer ID ${customerId}`
            })
        }

    } catch (error) {
        next(error);
    }
});

router.get('/:customerId', requireCustomer, async (req, res, next) => {
    const id = req.params.customerId
    const shippingInfo = await getShippingInfoById(id);

    try {
        if(shippingInfo) {
            res.send(shippingInfo);
        } else {
            res.send({
                error: 'idError',
                name: 'idError',
                message: `Customer ID ${id} does not exist`
            })
        }
    } catch (error) {
        next(error);
    }
});

router.patch('/:customerId', requireCustomer, async (req, res, next) => {
    const id = req.params.customerId;
    const {
        customerId,
        address,
        city,
        state,
        zipcode
    } = req.body;
    const updatedShippingInfo = await updateShippingInfo({
        customerId,
        address,
        city,
        state,
        zipcode
    });

    try {
        if (updatedShippingInfo) {
            res.send(updatedShippingInfo);
        } else {
            res.send({
                error: 'updateShippingError',
                name: 'updateShippingError',
                message: `Customer ID ${id} does not exist`
            })
        }
    } catch (error) {
        next(error);
    }
})

module.exports = router;