const express = require('express');
const router = express.Router();
const { requireCustomer } = require('./utils');

const {
  getAllOrderItemsByCustomerId,
  attachAnimalsToOrderItems,
  getAnimalById,
  createOrderItem
} = require('../db');

router.post('/', requireCustomer, async (req, res, next) => {
  const { animalId, customerId, orderId, quantity } = req.body;

  try {
    const newOrderItem = await createOrderItem({animalId, customerId, orderId, quantity});
    
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

router.post('/', requireCustomer, async (req,res,next)=>{
  const { animalId, customerId, orderId, quantity } = req.body
  console.log(req.body, 'req.body, order_items');

  try {
    const newOrder = await createOrderItem({ animalId, customerId, orderId, quantity });
    res.send(newOrder);
  } catch (error) {
    next(error)
  }
})

router.get('/:orderId', requireCustomer, async (req, res, next) => {
  console.log(req.params, 'req ')


    console.log(req.body, 'req.body in order_items')
  const animalById = await getAnimalById(animalId)
    console.log(animalById, 'animal by id')
  try {
      if(animalById){
          console.log(animalById, 'animal by id')
          const animalToCart = await attachAnimalsToOrderItems(customerId, animalId, quantity);
          console.log(animalToCart)
          res.send(animalToCart);
      }
          
  } catch(error) {
      next(error)
  } 
});







module.exports = router;