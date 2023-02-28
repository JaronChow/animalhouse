const client = require('../client');
const { attachCustomerSaleToSaleItem } = require('./customer_sales')

async function createSaleItem({ animalId, orderId, quantity }) {
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        INSERT INTO sale_items("animalId", "orderId", quantity)
        VALUES($1, $2, $3)
        ON CONFLICT("animalId", "orderId") DO NOTHING
        RETURNING *;
      `
    , [animalId, orderId, quantity]);
    return sale_item;
  } catch (error) {
    console.error(error);
  }
}

async function getAllSalesItemsByCustomer ({username}){
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
      SELECT sale_items. *, customer_sales.username
      FROM customer_sales
      JOIN sale_items
      ON sale_items."orderId" = customer_sales."customerId"
      WHERE customers_sales.username = username
      `
    ,);
      return attachCustomerSaleToSaleItem(sale_item)
  } catch (error) {
    console.error(error);
  } 
}

async function getSaleItemByOrderId({ orderId }) {
  try {
    const { rows: [ sale_item ] } = await client.query(
      `
        SELECT *
        FROM sale_items
        WHERE sale_items."orderId"=$1;
      `
    , [orderId]);

    return attachCustomerSaleToSaleItem(sale_item);
  } catch (error) {
    console.error(error);
  } 
}

async function getAllSaleItemsByOrderId({ orderId }) {
  try {
    const { rows } = await client.query(
      `
        SELECT sale_items.*
        FROM sale_items
        
      `
    , [orderId])

    return attachCustomerSaleToSaleItem(rows);
  } catch (error) {
    console.error(error);
  }
}


module.exports = {
  // add your database adapter fns here
  createSaleItem,
  getSaleItemByOrderId,
  getAllSaleItemsByOrderId
};