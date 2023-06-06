const express = require('express');
const router = express.Router();
const { requireCustomer } = require('./utils');

const {
  getAllOrderItemsByCustomerId,
  attachAnimalsToOrderItems,
  getAnimalById,
  getAllOrderItems,
  createOrderItem,
  deleteOrderItem
} = require('../db');
const { getOrderById } = require('../db/models/customer_orders');

router.post('/', requireCustomer, async (req, res, next) => {
  const { animalId, customerId, orderId } = req.body;

  try {
    const newOrderItem = await createOrderItem({animalId, customerId, orderId});
    
    if (req.user.role !== 'customer') {
      res.send({
        error: "Error",
        name: "UnauthorizedUser",
        message: "You must be a logged in customer to perform this action"
      })
    } else if (newOrderItem) {
      res.send(newOrderItem);
    } else {
      res.send({
        error: 'createOrderError',
        name: 'createOrderError',
        message: `Unable to create order item for customer`
      })
    }
  } catch (error) {
    next(error);  
  }  
});

router.get('/:customerId', requireCustomer, async (req, res, next) => {
  const { customerId } = req.params
    console.log(req.params, 'customer id')

  try {
    const orderItems = await getAllOrderItemsByCustomerId(customerId);
      console.log(orderItems, "api call")

    if (orderItems) {
      res.send(orderItems);

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

router.post('/', requireCustomer, async (req,res,next)=>{
  const { animalId, customerId, orderId } = req.body
  console.log(req.body, 'req.body, order_items');

  try {
    const newOrder = await createOrderItem({ animalId, customerId, orderId });
    res.send(newOrder);
  } catch (error) {
    next(error)
  }
})

router.delete('/:id', requireCustomer, async (req,res,next) => {
  const { id } = req.params
  console.log(req)
  try {
    const deleteOrder = await deleteOrderItem(id)
    res.send(deleteOrder)
  } catch (error) {
    next(error)
  }
})

module.exports = router;