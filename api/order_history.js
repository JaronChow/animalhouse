const express = require('express');
const router = express.Router();
const { requireCustomer } = require('./utils');
const {
  getAllorderItemsByCustomerId,
  createOrderItem
} = require('../db');

router.get('/:orderId', requireCustomer, async (req, res, next) => {
  const id = req.params.orderId;

  try {
    const OrderItem = await getAllorderItemsByCustomerId(id);

    if (OrderItem) {
      res.send(OrderItem);
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

// Require customer or admin?
router.post('/', requireCustomer, async (req, res, next) => {
  const { animalId, orderId, quantity } = req.body;
  const customerId = req.user.id;

  try {
    const newOrderItem = await createOrderItem({
      animalId,
      orderId,
      quantity
    });

    if (!req.customer) {
      res.send({
        error: "Error",
        name: "UnauthorizedUser",
        message: "You must be a logged in customer to perform this action"
      })
    } else if (newOrderItem) {
      res.send(newOrderItem);
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