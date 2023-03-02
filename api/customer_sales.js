const express = require('express');
const router = express.Router();
const { requireAdmin, requireCustomer } = require('./utils');
const { createSale, getSaleById } = require('../db');

router.get('/:customerId', requireCustomer, async (req, res, next) => {
  const id = req.params.customerId;
  const customerSale = await getSaleById(id);

  // console.log(customerSale, 'customerSale');
  try {
    if (customerSale) {
      res.send(customerSale);
    } else {
      res.send({
        error: 'idError',
        name: 'idError',
        message: `Sale ID ${id} does not exist`
      })
    }
  } catch (error) {
    next(error);  
  }
});

router.post('/', requireAdmin, async (req, res, next) => {
  const {
    customerId,
    total_item_amount,
    shipping_fee,
    sales_total_amount,
    sales_date
  } = req.body;

  try {
    const newSale = await createSale({
      customerId, 
      total_item_amount, 
      shipping_fee, 
      sales_total_amount, 
      sales_date 
    });
    
    if (!req.admin) {
      res.send({
        error: "Error",
        name: "UnauthorizedUser",
        message: "You must be an admin to perform this action"
      })
    } else if (newSale) {
      res.send(newSale);
    } else {
      res.send({
        error: 'createSaleError',
        name: 'createSaleError',
        message: `Unable to create sale for customer ID ${customerId}`
      })
    }
  } catch (error) {
    next(error);  
  }  
});

module.exports = router;