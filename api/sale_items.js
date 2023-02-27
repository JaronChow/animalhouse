const express = require('express');
const router = express.Router();
const { requireAdmin } = require('./utils');
const {
  getSaleItemByOrderId,
  createSaleItem
} = require('../db');

router.get('/:orderId/sale_items', async (req, res, next) => {
  const id = req.params.orderId;

  try {
    const saleItem = await getSaleItemByOrderId({ id });

    if (saleItem) {
      res.send(saleItem);
    } else {
      res.send({
        error: 'idError',
        name: 'idError',
        message: `Order ID ${id} does not exist`
      })
    }
  } catch (error) {
    next(error);  
  }
});

router.post('/', requireAdmin, async (req, res, next) => {
  const { animalId, orderId, quantity } = req.body;

  try {
    const newSaleItem = await createSaleItem({
      animalId,
      orderId,
      quantity
    });

    if (!req.admin) {
      res.send({
        error: "Error",
        name: "UnauthorizedUser",
        message: "You must be an admin to perform this action"
      })
    } else if (newSaleItem) {
      res.send(newSaleItem);
    } else {
      res.send({
        error: 'createSaleError',
        name: 'createSaleError',
        message: `Unable to create sale item for order ID ${orderId}`
      })
    }
  } catch (error) {
    next(error);  
  }  
});

module.exports = router;