const express = require('express');
const router = express.Router();
const { requireCustomer } = require('./utils');
const {
  getAllOrderItemsByCustomerId,
  createOrderItem,
} = require('../db');

router.get('/:orderId', requireCustomer, async (req, res, next) => {
  const id = req.params.orderId;

  try {
    const orderItem = await getAllOrderItemsByCustomerId(id);

    if (orderItem) {
      res.send(orderItem);
    } else {
      res.send({
        error: 'idError',
        name: 'idError',
        message: `Order Id ${id} does not exist`
      })
    }
  } catch (error) {
    next(error);  
  }
});


module.exports = router;