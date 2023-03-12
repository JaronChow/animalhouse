const express = require('express');
const router = express.Router();
const { requireCustomer } = require('./utils');

const {
  getAllOrderItemsByCustomerId,
  attachAnimalsToOrderItems
} = require('../db');

router.get('/:customerId', requireCustomer, async (req, res, next) => {
  const { customerId } = req.params
    console.log(req.params, 'customer id')

  try {
    const orderItem = await getAllOrderItemsByCustomerId(customerId);
      console.log(orderItem, "api call")

    if (orderItem) {
      res.send(orderItem);

    } else {
      res.send({
        error: 'idError',
        name: 'idError',
        message: `No orders for this customer`
      })
    }
  } catch (error) {
    console.error(error)
  }
});








module.exports = router;